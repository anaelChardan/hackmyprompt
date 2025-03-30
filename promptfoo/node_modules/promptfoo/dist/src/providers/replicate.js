"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplicateImageProvider = exports.DefaultModerationProvider = exports.ReplicateModerationProvider = exports.LLAMAGUARD_DESCRIPTIONS = exports.ReplicateProvider = void 0;
const cache_1 = require("../cache");
const envars_1 = require("../envars");
const logger_1 = __importDefault(require("../logger"));
const json_1 = require("../util/json");
const text_1 = require("../util/text");
const shared_1 = require("./shared");
async function getReplicateClient() {
    try {
        return (await Promise.resolve().then(() => __importStar(require('replicate')))).default;
    }
    catch (err) {
        throw new Error(`Failed to import Replicate. Make sure it is installed: npm install replicate. Error: ${err instanceof Error ? err.message : String(err)}`);
    }
}
class ReplicateProvider {
    constructor(modelName, options = {}) {
        const { config, id, env } = options;
        this.modelName = modelName;
        this.apiKey =
            config?.apiKey ||
                env?.REPLICATE_API_KEY ||
                env?.REPLICATE_API_TOKEN ||
                (0, envars_1.getEnvString)('REPLICATE_API_TOKEN') ||
                (0, envars_1.getEnvString)('REPLICATE_API_KEY');
        this.config = config || {};
        this.id = id ? () => id : this.id;
    }
    id() {
        return `replicate:${this.modelName}`;
    }
    toString() {
        return `[Replicate Provider ${this.modelName}]`;
    }
    async callApi(prompt) {
        if (!this.apiKey) {
            throw new Error('Replicate API key is not set. Set the REPLICATE_API_TOKEN environment variable or or add `apiKey` to the provider config.');
        }
        if (this.config.prompt?.prefix) {
            prompt = this.config.prompt.prefix + prompt;
        }
        if (this.config.prompt?.suffix) {
            prompt = prompt + this.config.prompt.suffix;
        }
        let cache;
        let cacheKey;
        if ((0, cache_1.isCacheEnabled)()) {
            cache = await (0, cache_1.getCache)();
            cacheKey = `replicate:${this.modelName}:${JSON.stringify(this.config)}:${prompt}`;
            // Try to get the cached response
            const cachedResponse = await cache.get(cacheKey);
            if (cachedResponse) {
                logger_1.default.debug(`Returning cached response for ${prompt}: ${cachedResponse}`);
                return JSON.parse(cachedResponse);
            }
        }
        const ReplicateClient = await getReplicateClient();
        const replicate = new ReplicateClient({
            auth: this.apiKey,
            fetch: fetch,
        });
        const messages = (0, shared_1.parseChatPrompt)(prompt, [{ role: 'user', content: prompt }]);
        const systemPrompt = messages.find((message) => message.role === 'system')?.content ||
            this.config.system_prompt ||
            (0, envars_1.getEnvString)('REPLICATE_SYSTEM_PROMPT');
        const userPrompt = messages.find((message) => message.role === 'user')?.content || prompt;
        logger_1.default.debug(`Calling Replicate: ${prompt}`);
        let response;
        try {
            const inputOptions = {
                max_length: this.config.max_length || (0, envars_1.getEnvInt)('REPLICATE_MAX_LENGTH'),
                max_new_tokens: this.config.max_new_tokens || (0, envars_1.getEnvInt)('REPLICATE_MAX_NEW_TOKENS'),
                temperature: this.config.temperature || (0, envars_1.getEnvFloat)('REPLICATE_TEMPERATURE'),
                top_p: this.config.top_p || (0, envars_1.getEnvFloat)('REPLICATE_TOP_P'),
                top_k: this.config.top_k || (0, envars_1.getEnvInt)('REPLICATE_TOP_K'),
                repetition_penalty: this.config.repetition_penalty || (0, envars_1.getEnvFloat)('REPLICATE_REPETITION_PENALTY'),
                stop_sequences: this.config.stop_sequences || (0, envars_1.getEnvString)('REPLICATE_STOP_SEQUENCES'),
                seed: this.config.seed || (0, envars_1.getEnvInt)('REPLICATE_SEED'),
                system_prompt: systemPrompt,
                prompt: userPrompt,
            };
            const data = {
                input: {
                    ...this.config,
                    ...Object.fromEntries(Object.entries(inputOptions).filter(([_, v]) => v !== undefined)),
                },
            };
            response = await replicate.run(this.modelName, data);
        }
        catch (err) {
            return {
                error: `API call error: ${String(err)}`,
            };
        }
        logger_1.default.debug(`\tReplicate API response: ${JSON.stringify(response)}`);
        try {
            let formattedOutput;
            if (Array.isArray(response)) {
                if (response.length === 0 || typeof response[0] === 'string') {
                    formattedOutput = response.join('');
                }
                else {
                    formattedOutput = JSON.stringify(response);
                }
            }
            else if (typeof response === 'string') {
                formattedOutput = response;
            }
            else {
                formattedOutput = JSON.stringify(response);
            }
            const result = {
                output: formattedOutput,
                tokenUsage: {}, // TODO: add token usage once Replicate API supports it
            };
            if (cache && cacheKey) {
                await cache.set(cacheKey, JSON.stringify(result));
            }
            return result;
        }
        catch (err) {
            return {
                error: `API response error: ${String(err)}: ${JSON.stringify(response)}`,
            };
        }
    }
}
exports.ReplicateProvider = ReplicateProvider;
exports.LLAMAGUARD_DESCRIPTIONS = {
    S1: 'Violent Crimes',
    S2: 'Non-Violent Crimes',
    S3: 'Sex Crimes',
    S4: 'Child Exploitation',
    S5: 'Defamation',
    S6: 'Specialized Advice',
    S7: 'Privacy',
    S8: 'Intellectual Property',
    S9: 'Indiscriminate Weapons',
    S10: 'Hate',
    S11: 'Self-Harm',
    S12: 'Sexual Content',
    S13: 'Elections',
};
class ReplicateModerationProvider extends ReplicateProvider {
    async callModerationApi(prompt, assistant) {
        if (!this.apiKey) {
            throw new Error('Replicate API key is not set. Set the REPLICATE_API_TOKEN environment variable or or add `apiKey` to the provider config.');
        }
        let cache;
        let cacheKey;
        if ((0, cache_1.isCacheEnabled)()) {
            cache = await (0, cache_1.getCache)();
            cacheKey = `replicate:${this.modelName}:${JSON.stringify(this.config)}:${prompt}:${assistant}`;
            // Try to get the cached response
            const cachedResponse = await cache.get(cacheKey);
            if (cachedResponse) {
                logger_1.default.debug(`Returning cached response for ${prompt}: ${cachedResponse}`);
                return JSON.parse(cachedResponse);
            }
        }
        const ReplicateClient = await getReplicateClient();
        const replicate = new ReplicateClient({
            auth: this.apiKey,
            fetch: fetch,
        });
        logger_1.default.debug(`Calling Replicate moderation API: prompt [${prompt}] assistant [${assistant}]`);
        let output;
        try {
            const data = {
                input: {
                    prompt,
                    assistant,
                },
            };
            const resp = await replicate.run(this.modelName, data);
            // Replicate SDK seems to be mis-typed for this type of model.
            output = resp;
        }
        catch (err) {
            return {
                error: `API call error: ${String(err)}`,
            };
        }
        logger_1.default.debug(`\tReplicate moderation API response: ${JSON.stringify(output)}`);
        try {
            if (!output) {
                throw new Error('API response error: no output');
            }
            const [safeString, codes] = output.split('\n');
            const saveCache = async () => {
                if (cache && cacheKey) {
                    await cache.set(cacheKey, JSON.stringify(output));
                }
            };
            const flags = [];
            if (safeString === 'safe') {
                await saveCache();
            }
            else {
                const splits = codes.split(',');
                for (const code of splits) {
                    if (exports.LLAMAGUARD_DESCRIPTIONS[code]) {
                        flags.push({
                            code,
                            description: `${exports.LLAMAGUARD_DESCRIPTIONS[code]} (${code})`,
                            confidence: 1,
                        });
                    }
                }
            }
            return { flags };
        }
        catch (err) {
            return {
                error: `API response error: ${String(err)}: ${JSON.stringify(output)}`,
            };
        }
    }
}
exports.ReplicateModerationProvider = ReplicateModerationProvider;
exports.DefaultModerationProvider = new ReplicateModerationProvider('meta/llama-guard-3-8b:146d1220d447cdcc639bc17c5f6137416042abee6ae153a2615e6ef5749205c8');
class ReplicateImageProvider extends ReplicateProvider {
    constructor(modelName, options = {}) {
        super(modelName, options);
        this.config = options.config || {};
    }
    async callApi(prompt, context, callApiOptions) {
        const cache = (0, cache_1.getCache)();
        const cacheKey = `replicate:image:${(0, json_1.safeJsonStringify)({ context, prompt })}`;
        if (!this.apiKey) {
            throw new Error('Replicate API key is not set. Set the REPLICATE_API_TOKEN environment variable or add `apiKey` to the provider config.');
        }
        const ReplicateClient = await getReplicateClient();
        const replicate = new ReplicateClient({
            auth: this.apiKey,
        });
        let response;
        let cached = false;
        if ((0, cache_1.isCacheEnabled)()) {
            const cachedResponse = await cache.get(cacheKey);
            if (cachedResponse) {
                logger_1.default.debug(`Retrieved cached response for ${prompt}: ${cachedResponse}`);
                response = JSON.parse(cachedResponse);
                cached = true;
            }
        }
        if (!response) {
            const data = {
                input: {
                    width: this.config.width || 768,
                    height: this.config.height || 768,
                    prompt,
                },
            };
            response = await replicate.run(this.modelName, data);
        }
        const url = response[0];
        if (!url) {
            return {
                error: `No image URL found in response: ${JSON.stringify(response)}`,
            };
        }
        if (!cached && (0, cache_1.isCacheEnabled)()) {
            try {
                await cache.set(cacheKey, JSON.stringify(response));
            }
            catch (err) {
                logger_1.default.error(`Failed to cache response: ${String(err)}`);
            }
        }
        const sanitizedPrompt = prompt
            .replace(/\r?\n|\r/g, ' ')
            .replace(/\[/g, '(')
            .replace(/\]/g, ')');
        const ellipsizedPrompt = (0, text_1.ellipsize)(sanitizedPrompt, 50);
        return {
            output: `![${ellipsizedPrompt}](${url})`,
            cached,
        };
    }
}
exports.ReplicateImageProvider = ReplicateImageProvider;
//# sourceMappingURL=replicate.js.map