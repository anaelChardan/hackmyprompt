"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiModerationProvider = exports.OPENAI_MODERATION_MODELS = void 0;
exports.isTextInput = isTextInput;
exports.isImageInput = isImageInput;
exports.supportsImageInput = supportsImageInput;
exports.formatModerationInput = formatModerationInput;
const _1 = require(".");
const cache_1 = require("../../cache");
const logger_1 = __importDefault(require("../../logger"));
const shared_1 = require("../shared");
exports.OPENAI_MODERATION_MODELS = [
    { id: 'omni-moderation-latest', maxTokens: 32768, capabilities: ['text', 'image'] },
    { id: 'omni-moderation-2024-09-26', maxTokens: 32768, capabilities: ['text', 'image'] },
    { id: 'text-moderation-latest', maxTokens: 32768, capabilities: ['text'] },
    { id: 'text-moderation-stable', maxTokens: 32768, capabilities: ['text'] },
    { id: 'text-moderation-007', maxTokens: 32768, capabilities: ['text'] },
];
function isTextInput(input) {
    return input.type === 'text';
}
function isImageInput(input) {
    return input.type === 'image_url';
}
function parseOpenAIModerationResponse(data) {
    const { results } = data;
    if (!results || results.length === 0) {
        return { flags: [] };
    }
    // Use a Map to keep track of unique flag codes and their highest confidence score
    const flagMap = new Map();
    for (const result of results) {
        if (result.flagged) {
            for (const [category, flagged] of Object.entries(result.categories)) {
                if (flagged) {
                    // If this category already exists in our map, keep the higher confidence score
                    const existingConfidence = flagMap.get(category);
                    const currentConfidence = result.category_scores[category];
                    if (existingConfidence === undefined || currentConfidence > existingConfidence) {
                        flagMap.set(category, currentConfidence);
                    }
                }
            }
        }
    }
    // Convert the map to an array of ModerationFlag objects
    const flags = Array.from(flagMap.entries()).map(([code, confidence]) => ({
        code,
        description: code,
        confidence,
    }));
    return { flags };
}
function handleApiError(err, data) {
    logger_1.default.error(`API error: ${String(err)}`);
    return {
        error: data
            ? `API error: ${String(err)}: ${typeof data === 'string' ? data : JSON.stringify(data)}`
            : `API call error: ${String(err)}`,
    };
}
function getModerationCacheKey(modelName, config, content) {
    const contentKey = typeof content === 'string' ? content : JSON.stringify(content);
    return `openai:moderation:${modelName}:${JSON.stringify(config)}:${contentKey}`;
}
function supportsImageInput(modelName) {
    const model = exports.OPENAI_MODERATION_MODELS.find((model) => model.id === modelName);
    return model?.capabilities.includes('image') ?? false;
}
function formatModerationInput(content, supportsImages) {
    if (typeof content === 'string') {
        return supportsImages ? [{ type: 'text', text: content }] : content;
    }
    if (!supportsImages) {
        logger_1.default.warn('Using image inputs with a text-only moderation model. Images will be ignored.');
        const textContent = content
            .filter(isTextInput)
            .map((item) => item.text)
            .join(' ');
        return textContent;
    }
    return content;
}
class OpenAiModerationProvider extends _1.OpenAiGenericProvider {
    constructor(modelName = 'text-moderation-latest', options = {}) {
        super(modelName, options);
        if (!OpenAiModerationProvider.MODERATION_MODEL_IDS.includes(modelName)) {
            logger_1.default.warn(`Using unknown OpenAI moderation model: ${modelName}`);
        }
    }
    async callModerationApi(userPrompt, assistantResponse) {
        const apiKey = this.getApiKey();
        if (this.requiresApiKey() && !apiKey) {
            return handleApiError('OpenAI API key is not set. Set the OPENAI_API_KEY environment variable or add `apiKey` to the provider config.');
        }
        const useCache = (0, cache_1.isCacheEnabled)();
        let cacheKey = '';
        if (useCache) {
            cacheKey = getModerationCacheKey(this.modelName, this.config, assistantResponse);
            const cache = await (0, cache_1.getCache)();
            const cachedResponse = await cache.get(cacheKey);
            if (cachedResponse) {
                logger_1.default.debug('Returning cached moderation response');
                return JSON.parse(cachedResponse);
            }
        }
        logger_1.default.debug(`Calling OpenAI moderation API with model ${this.modelName}`);
        const supportsImages = supportsImageInput(this.modelName);
        const input = formatModerationInput(assistantResponse, supportsImages);
        const requestBody = JSON.stringify({
            model: this.modelName,
            input,
        });
        const headers = {
            'Content-Type': 'application/json',
            ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
            ...(this.getOrganization() ? { 'OpenAI-Organization': this.getOrganization() } : {}),
            ...this.config.headers,
        };
        try {
            const { data, status, statusText } = await (0, cache_1.fetchWithCache)(`${this.getApiUrl()}/moderations`, {
                method: 'POST',
                headers,
                body: requestBody,
            }, shared_1.REQUEST_TIMEOUT_MS);
            if (status < 200 || status >= 300) {
                return handleApiError(`${status} ${statusText}`, typeof data === 'string' ? data : JSON.stringify(data));
            }
            logger_1.default.debug(`\tOpenAI moderation API response: ${JSON.stringify(data)}`);
            const response = parseOpenAIModerationResponse(data);
            if (useCache) {
                const cache = await (0, cache_1.getCache)();
                await cache.set(cacheKey, JSON.stringify(response));
            }
            return response;
        }
        catch (err) {
            return handleApiError(err);
        }
    }
}
exports.OpenAiModerationProvider = OpenAiModerationProvider;
OpenAiModerationProvider.MODERATION_MODELS = exports.OPENAI_MODERATION_MODELS;
OpenAiModerationProvider.MODERATION_MODEL_IDS = exports.OPENAI_MODERATION_MODELS.map((model) => model.id);
//# sourceMappingURL=moderation.js.map