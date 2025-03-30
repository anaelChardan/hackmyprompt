"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicGenericProvider = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const envars_1 = require("../../envars");
/**
 * Generic provider class for Anthropic APIs
 * Serves as a base class with shared functionality for all Anthropic providers
 */
class AnthropicGenericProvider {
    constructor(modelName, options = {}) {
        const { config, id, env } = options;
        this.env = env;
        this.modelName = modelName;
        this.config = config || {};
        this.apiKey = this.getApiKey();
        this.anthropic = new sdk_1.default({
            apiKey: this.apiKey,
            baseURL: this.getApiBaseUrl(),
        });
        this.id = id ? () => id : this.id;
    }
    id() {
        return `anthropic:${this.modelName}`;
    }
    toString() {
        return `[Anthropic Provider ${this.modelName}]`;
    }
    getApiKey() {
        return this.config?.apiKey || this.env?.ANTHROPIC_API_KEY || (0, envars_1.getEnvString)('ANTHROPIC_API_KEY');
    }
    getApiBaseUrl() {
        return (this.config?.apiBaseUrl || this.env?.ANTHROPIC_BASE_URL || (0, envars_1.getEnvString)('ANTHROPIC_BASE_URL'));
    }
    /**
     * Base implementation - should be overridden by specific provider implementations
     */
    async callApi(prompt) {
        throw new Error('Not implemented: callApi must be implemented by subclasses');
    }
}
exports.AnthropicGenericProvider = AnthropicGenericProvider;
//# sourceMappingURL=generic.js.map