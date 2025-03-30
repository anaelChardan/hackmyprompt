"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqProvider = void 0;
const chat_1 = require("./openai/chat");
class GroqProvider extends chat_1.OpenAiChatCompletionProvider {
    get apiKey() {
        return this.config?.apiKey;
    }
    isReasoningModel() {
        // Groq's reasoning models include deepseek-r1 models and any others they may add
        return this.modelName.includes('deepseek-r1') || super.isReasoningModel();
    }
    supportsTemperature() {
        // Groq's deepseek models support temperature, even though they're reasoning models
        if (this.modelName.includes('deepseek-r1')) {
            return true;
        }
        return super.supportsTemperature();
    }
    constructor(modelName, providerOptions) {
        super(modelName, {
            ...providerOptions,
            config: {
                ...providerOptions.config,
                apiKeyEnvar: 'GROQ_API_KEY',
                apiBaseUrl: 'https://api.groq.com/openai/v1',
            },
        });
    }
    id() {
        return `groq:${this.modelName}`;
    }
    toString() {
        return `[Groq Provider ${this.modelName}]`;
    }
    toJSON() {
        return {
            provider: 'groq',
            model: this.modelName,
            config: {
                ...this.config,
                ...(this.apiKey && { apiKey: undefined }),
            },
        };
    }
}
exports.GroqProvider = GroqProvider;
//# sourceMappingURL=groq.js.map