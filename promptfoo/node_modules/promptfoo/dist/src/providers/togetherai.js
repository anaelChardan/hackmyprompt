"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTogetherAiProvider = createTogetherAiProvider;
const chat_1 = require("./openai/chat");
const completion_1 = require("./openai/completion");
const embedding_1 = require("./openai/embedding");
/**
 * Creates a TogetherAI provider using OpenAI-compatible endpoints
 *
 * TogetherAI supports many parameters beyond standard OpenAI ones.
 * All parameters are automatically passed through to the TogetherAI API.
 */
function createTogetherAiProvider(providerPath, options = {}) {
    const splits = providerPath.split(':');
    const config = options.config?.config || {};
    const togetherAiConfig = {
        ...options,
        config: {
            apiBaseUrl: 'https://api.together.xyz/v1',
            apiKeyEnvar: 'TOGETHER_API_KEY',
            passthrough: {
                ...config,
            },
        },
    };
    if (splits[1] === 'chat') {
        const modelName = splits.slice(2).join(':');
        return new chat_1.OpenAiChatCompletionProvider(modelName, togetherAiConfig);
    }
    else if (splits[1] === 'completion') {
        const modelName = splits.slice(2).join(':');
        return new completion_1.OpenAiCompletionProvider(modelName, togetherAiConfig);
    }
    else if (splits[1] === 'embedding' || splits[1] === 'embeddings') {
        const modelName = splits.slice(2).join(':');
        return new embedding_1.OpenAiEmbeddingProvider(modelName, togetherAiConfig);
    }
    else {
        // If no specific type is provided, default to chat
        const modelName = splits.slice(1).join(':');
        return new chat_1.OpenAiChatCompletionProvider(modelName, togetherAiConfig);
    }
}
//# sourceMappingURL=togetherai.js.map