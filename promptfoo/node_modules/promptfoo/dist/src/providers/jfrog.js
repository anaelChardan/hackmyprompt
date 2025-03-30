"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JfrogMlChatCompletionProvider = void 0;
const chat_1 = require("./openai/chat");
class JfrogMlChatCompletionProvider extends chat_1.OpenAiChatCompletionProvider {
    constructor(modelName, providerOptions) {
        super(modelName, {
            ...providerOptions,
            config: {
                ...providerOptions.config,
                apiKeyEnvar: 'QWAK_TOKEN',
                apiBaseUrl: `${providerOptions.config?.baseUrl || 'https://models.qwak-prod.qwak.ai/v1'}/${modelName}`,
            },
        });
    }
}
exports.JfrogMlChatCompletionProvider = JfrogMlChatCompletionProvider;
//# sourceMappingURL=jfrog.js.map