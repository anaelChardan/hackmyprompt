"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureEmbeddingProvider = void 0;
const cache_1 = require("../../cache");
const logger_1 = __importDefault(require("../../logger"));
const invariant_1 = __importDefault(require("../../util/invariant"));
const shared_1 = require("../shared");
const defaults_1 = require("./defaults");
const generic_1 = require("./generic");
class AzureEmbeddingProvider extends generic_1.AzureGenericProvider {
    async callEmbeddingApi(text) {
        await this.ensureInitialized();
        (0, invariant_1.default)(this.authHeaders, 'auth headers are not initialized');
        if (!this.getApiBaseUrl()) {
            throw new Error('Azure API host must be set.');
        }
        const body = {
            input: text,
            model: this.deploymentName,
        };
        let data, cached = false;
        try {
            ({ data, cached } = (await (0, cache_1.fetchWithCache)(`${this.getApiBaseUrl()}/openai/deployments/${this.deploymentName}/embeddings?api-version=${this.config.apiVersion || defaults_1.DEFAULT_AZURE_API_VERSION}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...this.authHeaders,
                },
                body: JSON.stringify(body),
            }, shared_1.REQUEST_TIMEOUT_MS)));
        }
        catch (err) {
            return {
                error: `API call error: ${String(err)}`,
                tokenUsage: {
                    total: 0,
                    prompt: 0,
                    completion: 0,
                },
            };
        }
        logger_1.default.debug(`\tAzure API response (embeddings): ${JSON.stringify(data)}`);
        try {
            const embedding = data?.data?.[0]?.embedding;
            if (!embedding) {
                throw new Error('No embedding returned');
            }
            const ret = {
                embedding,
                tokenUsage: cached
                    ? { cached: data.usage.total_tokens, total: data.usage.total_tokens }
                    : {
                        total: data.usage.total_tokens,
                        prompt: data.usage.prompt_tokens,
                        completion: data.usage.completion_tokens,
                    },
            };
            return ret;
        }
        catch (err) {
            return {
                error: `API response error: ${String(err)}: ${JSON.stringify(data)}`,
                tokenUsage: cached
                    ? {
                        cached: data.usage.total_tokens,
                        total: data.usage.total_tokens,
                    }
                    : {
                        total: data?.usage?.total_tokens,
                        prompt: data?.usage?.prompt_tokens,
                        completion: data?.usage?.completion_tokens,
                    },
            };
        }
    }
}
exports.AzureEmbeddingProvider = AzureEmbeddingProvider;
//# sourceMappingURL=embedding.js.map