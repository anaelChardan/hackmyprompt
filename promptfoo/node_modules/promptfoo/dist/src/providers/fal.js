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
exports.FalImageGenerationProvider = void 0;
const cache_1 = require("../cache");
const envars_1 = require("../envars");
const logger_1 = __importDefault(require("../logger"));
const text_1 = require("../util/text");
class FalProvider {
    constructor(modelType, modelName, options = {}) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports
        this.fal = null;
        this.modelType = modelType;
        this.modelName = modelName;
        const { config, id, env } = options;
        this.id = id ? () => id : this.id;
        this.config = config ?? {};
        const { apiKey, ...input } = this.config;
        this.apiKey = apiKey ?? env?.FAL_KEY ?? (0, envars_1.getEnvString)('FAL_KEY');
        this.input = input;
    }
    id() {
        return `fal:${this.modelType}:${this.modelName}`;
    }
    toString() {
        return `[fal.ai Inference Provider ${this.modelName}]`;
    }
    async callApi(prompt, context) {
        if (!this.apiKey) {
            throw new Error('fal.ai API key is not set. Set the FAL_KEY environment variable or or add `apiKey` to the provider config.');
        }
        let response;
        let cache;
        let cached = false;
        const input = {
            prompt,
            ...this.input,
            ...(context?.prompt?.config ?? {}),
        };
        const cacheKey = `fal:${this.modelName}:${JSON.stringify(input)}`;
        if ((0, cache_1.isCacheEnabled)()) {
            cache = (0, cache_1.getCache)();
            const cachedResponse = await cache.get(cacheKey);
            response = cachedResponse ? JSON.parse(cachedResponse) : undefined;
            cached = response !== undefined;
        }
        if (!this.fal) {
            this.fal = await Promise.resolve().then(() => __importStar(require('@fal-ai/serverless-client')));
        }
        this.fal.config({
            credentials: this.apiKey,
            fetch: fetch, // TODO fix type incompatibility
        });
        if (!response) {
            response = await this.runInference(input);
        }
        if (!cached && (0, cache_1.isCacheEnabled)() && cache) {
            try {
                await cache.set(cacheKey, JSON.stringify(response));
            }
            catch (err) {
                logger_1.default.error(`Failed to cache response: ${String(err)}`);
            }
        }
        return {
            cached,
            output: response,
        };
    }
    async runInference(input) {
        if (!this.fal) {
            this.fal = await Promise.resolve().then(() => __importStar(require('@fal-ai/serverless-client')));
        }
        const result = await this.fal.subscribe(this.modelName, {
            input,
        });
        return result;
    }
}
class FalImageGenerationProvider extends FalProvider {
    constructor(modelName, options = {}) {
        super('image', modelName, options);
    }
    toString() {
        return `[fal.ai Image Generation Provider ${this.modelName}]`;
    }
    async runInference(input) {
        const result = await super.runInference(input);
        const url = this.resolveImageUrl(result);
        const sanitizedPrompt = input.prompt
            .replace(/\r?\n|\r/g, ' ')
            .replace(/\[/g, '(')
            .replace(/\]/g, ')');
        const ellipsizedPrompt = (0, text_1.ellipsize)(sanitizedPrompt, 50);
        return `![${ellipsizedPrompt}](${url})`;
    }
    resolveImageUrl(output) {
        if (Array.isArray(output.images) && output.images.length > 0) {
            return output.images[0].url;
        }
        if (typeof output.image === 'object' &&
            'url' in output.image &&
            typeof output.image.url === 'string') {
            return output.image.url;
        }
        throw new Error('Failed to resolve image URL.');
    }
}
exports.FalImageGenerationProvider = FalImageGenerationProvider;
//# sourceMappingURL=fal.js.map