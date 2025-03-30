"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwConfigurationError = throwConfigurationError;
exports.calculateAzureCost = calculateAzureCost;
const dedent_1 = __importDefault(require("dedent"));
const shared_1 = require("../shared");
const defaults_1 = require("./defaults");
/**
 * Throws a configuration error with standard formatting and documentation link
 */
function throwConfigurationError(message) {
    throw new Error((0, dedent_1.default) `
    ${message}

    See https://www.promptfoo.dev/docs/providers/azure/ to learn more about Azure configuration.
  `);
}
/**
 * Calculate Azure cost based on model name and token usage
 */
function calculateAzureCost(modelName, config, promptTokens, completionTokens) {
    return (0, shared_1.calculateCost)(modelName, { cost: undefined }, promptTokens, completionTokens, defaults_1.AZURE_MODELS);
}
//# sourceMappingURL=util.js.map