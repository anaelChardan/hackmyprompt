"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureCompletionProvider = void 0;
const cache_1 = require("../../cache");
const envars_1 = require("../../envars");
const logger_1 = __importDefault(require("../../logger"));
const invariant_1 = __importDefault(require("../../util/invariant"));
const shared_1 = require("../shared");
const defaults_1 = require("./defaults");
const generic_1 = require("./generic");
const util_1 = require("./util");
class AzureCompletionProvider extends generic_1.AzureGenericProvider {
    async callApi(prompt, context, callApiOptions) {
        await this.ensureInitialized();
        (0, invariant_1.default)(this.authHeaders, 'auth headers are not initialized');
        if (!this.getApiBaseUrl()) {
            throw new Error('Azure API host must be set.');
        }
        let stop;
        try {
            const stopEnvVar = (0, envars_1.getEnvString)('OPENAI_STOP');
            stop = stopEnvVar ? JSON.parse(stopEnvVar) : (this.config.stop ?? '');
        }
        catch (err) {
            throw new Error(`OPENAI_STOP is not a valid JSON string: ${err}`);
        }
        const body = {
            model: this.deploymentName,
            prompt,
            max_tokens: this.config.max_tokens ?? (0, envars_1.getEnvInt)('OPENAI_MAX_TOKENS', 1024),
            temperature: this.config.temperature ?? (0, envars_1.getEnvFloat)('OPENAI_TEMPERATURE', 0),
            top_p: this.config.top_p ?? (0, envars_1.getEnvFloat)('OPENAI_TOP_P', 1),
            presence_penalty: this.config.presence_penalty ?? (0, envars_1.getEnvFloat)('OPENAI_PRESENCE_PENALTY', 0),
            frequency_penalty: this.config.frequency_penalty ?? (0, envars_1.getEnvFloat)('OPENAI_FREQUENCY_PENALTY', 0),
            best_of: this.config.best_of ?? (0, envars_1.getEnvInt)('OPENAI_BEST_OF', 1),
            ...(stop ? { stop } : {}),
            ...(this.config.passthrough || {}),
        };
        logger_1.default.debug(`Calling Azure API: ${JSON.stringify(body)}`);
        let data;
        let cached = false;
        try {
            ({ data, cached } = (await (0, cache_1.fetchWithCache)(`${this.getApiBaseUrl()}/openai/deployments/${this.deploymentName}/completions?api-version=${this.config.apiVersion || defaults_1.DEFAULT_AZURE_API_VERSION}`, {
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
            };
        }
        logger_1.default.debug(`Azure API response: ${JSON.stringify(data)}`);
        try {
            // Check for content filter
            const choice = data.choices[0];
            let output = choice.text;
            if (output == null) {
                if (choice.finish_reason === 'content_filter') {
                    output =
                        "The generated content was filtered due to triggering Azure OpenAI Service's content filtering system.";
                }
                else {
                    output = '';
                }
            }
            return {
                output,
                tokenUsage: cached
                    ? { cached: data.usage.total_tokens, total: data.usage.total_tokens }
                    : {
                        total: data.usage.total_tokens,
                        prompt: data.usage.prompt_tokens,
                        completion: data.usage.completion_tokens,
                    },
                cost: (0, util_1.calculateAzureCost)(this.deploymentName, this.config, data.usage?.prompt_tokens, data.usage?.completion_tokens),
            };
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
exports.AzureCompletionProvider = AzureCompletionProvider;
//# sourceMappingURL=completion.js.map