"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicCompletionProvider = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const cache_1 = require("../../cache");
const envars_1 = require("../../envars");
const logger_1 = __importDefault(require("../../logger"));
const generic_1 = require("./generic");
class AnthropicCompletionProvider extends generic_1.AnthropicGenericProvider {
    constructor(modelName, options = {}) {
        super(modelName, options);
    }
    async callApi(prompt) {
        if (!this.apiKey) {
            throw new Error('Anthropic API key is not set. Set the ANTHROPIC_API_KEY environment variable or add `apiKey` to the provider config.');
        }
        let stop;
        try {
            stop = (0, envars_1.getEnvString)('ANTHROPIC_STOP')
                ? JSON.parse((0, envars_1.getEnvString)('ANTHROPIC_STOP') || '')
                : ['<|im_end|>', '<|endoftext|>'];
        }
        catch (err) {
            throw new Error(`ANTHROPIC_STOP is not a valid JSON string: ${err}`);
        }
        const params = {
            model: this.modelName,
            prompt: `${sdk_1.default.HUMAN_PROMPT} ${prompt} ${sdk_1.default.AI_PROMPT}`,
            max_tokens_to_sample: this.config?.max_tokens_to_sample || (0, envars_1.getEnvInt)('ANTHROPIC_MAX_TOKENS', 1024),
            temperature: this.config.temperature ?? (0, envars_1.getEnvFloat)('ANTHROPIC_TEMPERATURE', 0),
            stop_sequences: stop,
        };
        logger_1.default.debug(`Calling Anthropic API: ${JSON.stringify(params)}`);
        const cache = await (0, cache_1.getCache)();
        const cacheKey = `anthropic:${JSON.stringify(params)}`;
        if ((0, cache_1.isCacheEnabled)()) {
            // Try to get the cached response
            const cachedResponse = await cache.get(cacheKey);
            if (cachedResponse) {
                logger_1.default.debug(`Returning cached response for ${prompt}: ${cachedResponse}`);
                return {
                    output: JSON.parse(cachedResponse),
                    tokenUsage: {},
                };
            }
        }
        let response;
        try {
            response = await this.anthropic.completions.create(params);
        }
        catch (err) {
            return {
                error: `API call error: ${String(err)}`,
            };
        }
        logger_1.default.debug(`\tAnthropic API response: ${JSON.stringify(response)}`);
        if ((0, cache_1.isCacheEnabled)()) {
            try {
                await cache.set(cacheKey, JSON.stringify(response.completion));
            }
            catch (err) {
                logger_1.default.error(`Failed to cache response: ${String(err)}`);
            }
        }
        try {
            return {
                output: response.completion,
                tokenUsage: {}, // TODO: add token usage once Anthropic API supports it
            };
        }
        catch (err) {
            return {
                error: `API response error: ${String(err)}: ${JSON.stringify(response)}`,
            };
        }
    }
}
exports.AnthropicCompletionProvider = AnthropicCompletionProvider;
// NOTE: As of March 15, 2025, all legacy completion models are retired
// and should not be used for new applications.
// Recommended alternatives:
// - For claude-1.x and claude-instant-1.x: use claude-3-5-haiku-20241022
// - For claude-2.x: use claude-3-5-sonnet-20241022
AnthropicCompletionProvider.ANTHROPIC_COMPLETION_MODELS = [
    // All models below are deprecated and will be retired soon
    // Only kept for reference - migrate to newer models in new code
    'claude-2.0', // Deprecated, retiring July 21, 2025
    'claude-2.1', // Deprecated, retiring July 21, 2025
];
//# sourceMappingURL=completion.js.map