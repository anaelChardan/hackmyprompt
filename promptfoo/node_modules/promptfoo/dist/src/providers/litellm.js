"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteLLMProvider = void 0;
const chat_1 = require("./openai/chat");
class LiteLLMProvider extends chat_1.OpenAiChatCompletionProvider {
    constructor(modelName, providerOptions) {
        super(modelName, {
            ...providerOptions,
            config: {
                ...providerOptions.config,
                apiKeyEnvar: 'LITELLM_API_KEY',
                apiKeyRequired: false,
                apiBaseUrl: providerOptions.config?.apiBaseUrl || 'http://0.0.0.0:4000',
            },
        });
    }
    id() {
        return `litellm:${this.modelName}`;
    }
    toString() {
        return `[LiteLLM Provider ${this.modelName}]`;
    }
    toJSON() {
        return {
            provider: 'litellm',
            model: this.modelName,
            config: {
                ...this.config,
                ...(this.getApiKey() && { apiKey: undefined }),
            },
        };
    }
}
exports.LiteLLMProvider = LiteLLMProvider;
//# sourceMappingURL=litellm.js.map