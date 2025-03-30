"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiEmbeddingProvider = void 0;
const _1 = require(".");
const cache_1 = require("../../cache");
const logger_1 = __importDefault(require("../../logger"));
const shared_1 = require("../shared");
const util_1 = require("./util");
class OpenAiEmbeddingProvider extends _1.OpenAiGenericProvider {
    async callEmbeddingApi(text) {
        if (!this.getApiKey()) {
            throw new Error('OpenAI API key must be set for similarity comparison');
        }
        const body = {
            input: text,
            model: this.modelName,
        };
        let data, cached = false;
        try {
            ({ data, cached } = (await (0, cache_1.fetchWithCache)(`${this.getApiUrl()}/embeddings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.getApiKey()}`,
                    ...(this.getOrganization() ? { 'OpenAI-Organization': this.getOrganization() } : {}),
                    ...this.config.headers,
                },
                body: JSON.stringify(body),
            }, shared_1.REQUEST_TIMEOUT_MS)));
        }
        catch (err) {
            logger_1.default.error(`API call error: ${err}`);
            throw err;
        }
        logger_1.default.debug(`\tOpenAI embeddings API response: ${JSON.stringify(data)}`);
        try {
            const embedding = data?.data?.[0]?.embedding;
            if (!embedding) {
                throw new Error('No embedding found in OpenAI embeddings API response');
            }
            return {
                embedding,
                tokenUsage: (0, util_1.getTokenUsage)(data, cached),
            };
        }
        catch (err) {
            logger_1.default.error(data.error.message);
            throw err;
        }
    }
}
exports.OpenAiEmbeddingProvider = OpenAiEmbeddingProvider;
//# sourceMappingURL=embedding.js.map