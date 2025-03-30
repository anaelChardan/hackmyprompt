"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabricksMosaicAiChatCompletionProvider = void 0;
const envars_1 = require("../envars");
const chat_1 = require("./openai/chat");
// https://docs.databricks.com/en/large-language-models/llm-serving-intro.html#get-started-using-foundation-model-apis
class DatabricksMosaicAiChatCompletionProvider extends chat_1.OpenAiChatCompletionProvider {
    constructor(modelName, providerOptions) {
        const workspaceUrl = providerOptions.config?.workspaceUrl || (0, envars_1.getEnvString)('DATABRICKS_WORKSPACE_URL');
        if (!workspaceUrl) {
            throw new Error('Databricks workspace URL is required. Set it in the config or DATABRICKS_WORKSPACE_URL environment variable.');
        }
        super(modelName, {
            ...providerOptions,
            config: {
                ...providerOptions.config,
                apiKeyEnvar: 'DATABRICKS_TOKEN',
                apiBaseUrl: `${workspaceUrl}/serving-endpoints`,
            },
        });
    }
}
exports.DatabricksMosaicAiChatCompletionProvider = DatabricksMosaicAiChatCompletionProvider;
//# sourceMappingURL=databricks.js.map