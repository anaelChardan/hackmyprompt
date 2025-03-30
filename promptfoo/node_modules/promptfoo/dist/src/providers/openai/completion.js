"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiCompletionProvider = void 0;
const _1 = require(".");
const cache_1 = require("../../cache");
const envars_1 = require("../../envars");
const logger_1 = __importDefault(require("../../logger"));
const shared_1 = require("../shared");
const util_1 = require("./util");
const util_2 = require("./util");
class OpenAiCompletionProvider extends _1.OpenAiGenericProvider {
    constructor(modelName, options = {}) {
        super(modelName, options);
        this.config = options.config || {};
        if (!OpenAiCompletionProvider.OPENAI_COMPLETION_MODEL_NAMES.includes(modelName) &&
            this.getApiUrl() === this.getApiUrlDefault()) {
            logger_1.default.warn(`FYI: Using unknown OpenAI completion model: ${modelName}`);
        }
    }
    async callApi(prompt, context, callApiOptions) {
        if (this.requiresApiKey() && !this.getApiKey()) {
            throw new Error('OpenAI API key is not set. Set the OPENAI_API_KEY environment variable or add `apiKey` to the provider config.');
        }
        let stop;
        try {
            stop = (0, envars_1.getEnvString)('OPENAI_STOP')
                ? JSON.parse((0, envars_1.getEnvString)('OPENAI_STOP') || '')
                : this.config?.stop || ['<|im_end|>', '<|endoftext|>'];
        }
        catch (err) {
            throw new Error(`OPENAI_STOP is not a valid JSON string: ${err}`);
        }
        const body = {
            model: this.modelName,
            prompt,
            seed: this.config.seed,
            max_tokens: this.config.max_tokens ?? (0, envars_1.getEnvInt)('OPENAI_MAX_TOKENS', 1024),
            temperature: this.config.temperature ?? (0, envars_1.getEnvFloat)('OPENAI_TEMPERATURE', 0),
            top_p: this.config.top_p ?? (0, envars_1.getEnvFloat)('OPENAI_TOP_P', 1),
            presence_penalty: this.config.presence_penalty ?? (0, envars_1.getEnvFloat)('OPENAI_PRESENCE_PENALTY', 0),
            frequency_penalty: this.config.frequency_penalty ?? (0, envars_1.getEnvFloat)('OPENAI_FREQUENCY_PENALTY', 0),
            best_of: this.config.best_of ?? (0, envars_1.getEnvInt)('OPENAI_BEST_OF', 1),
            ...(callApiOptions?.includeLogProbs ? { logprobs: callApiOptions.includeLogProbs } : {}),
            ...(stop ? { stop } : {}),
            ...(this.config.passthrough || {}),
        };
        logger_1.default.debug(`Calling OpenAI API: ${JSON.stringify(body)}`);
        let data, cached = false;
        try {
            ({ data, cached } = (await (0, cache_1.fetchWithCache)(`${this.getApiUrl()}/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.getApiKey() ? { Authorization: `Bearer ${this.getApiKey()}` } : {}),
                    ...(this.getOrganization() ? { 'OpenAI-Organization': this.getOrganization() } : {}),
                    ...this.config.headers,
                },
                body: JSON.stringify(body),
            }, shared_1.REQUEST_TIMEOUT_MS)));
        }
        catch (err) {
            logger_1.default.error(`API call error: ${String(err)}`);
            return {
                error: `API call error: ${String(err)}`,
            };
        }
        logger_1.default.debug(`\tOpenAI completions API response: ${JSON.stringify(data)}`);
        if (data.error) {
            return {
                error: (0, util_2.formatOpenAiError)(data),
            };
        }
        try {
            return {
                output: data.choices[0].text,
                tokenUsage: (0, util_2.getTokenUsage)(data, cached),
                cached,
                cost: (0, util_1.calculateOpenAICost)(this.modelName, this.config, data.usage?.prompt_tokens, data.usage?.completion_tokens),
            };
        }
        catch (err) {
            return {
                error: `API error: ${String(err)}: ${JSON.stringify(data)}`,
            };
        }
    }
}
exports.OpenAiCompletionProvider = OpenAiCompletionProvider;
OpenAiCompletionProvider.OPENAI_COMPLETION_MODELS = util_2.OPENAI_COMPLETION_MODELS;
OpenAiCompletionProvider.OPENAI_COMPLETION_MODEL_NAMES = util_2.OPENAI_COMPLETION_MODELS.map((model) => model.id);
//# sourceMappingURL=completion.js.map