"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_TIMEOUT_MS = void 0;
exports.calculateCost = calculateCost;
exports.parseChatPrompt = parseChatPrompt;
exports.toTitleCase = toTitleCase;
const js_yaml_1 = __importDefault(require("js-yaml"));
const envars_1 = require("../envars");
/**
 * The default timeout for API requests in milliseconds.
 */
exports.REQUEST_TIMEOUT_MS = (0, envars_1.getEnvInt)('REQUEST_TIMEOUT_MS', 300000);
/**
 * Calculates the cost of an API call based on the model and token usage.
 *
 * @param {string} modelName The name of the model used.
 * @param {ProviderConfig} config The provider configuration.
 * @param {number | undefined} promptTokens The number of tokens in the prompt.
 * @param {number | undefined} completionTokens The number of tokens in the completion.
 * @param {ProviderModel[]} models An array of available models with their costs.
 * @returns {number | undefined} The calculated cost, or undefined if it can't be calculated.
 */
function calculateCost(modelName, config, promptTokens, completionTokens, models) {
    if (!Number.isFinite(promptTokens) ||
        !Number.isFinite(completionTokens) ||
        typeof promptTokens === 'undefined' ||
        typeof completionTokens === 'undefined') {
        return undefined;
    }
    const model = models.find((m) => m.id === modelName);
    if (!model || !model.cost) {
        return undefined;
    }
    const inputCost = config.cost ?? model.cost.input;
    const outputCost = config.cost ?? model.cost.output;
    return inputCost * promptTokens + outputCost * completionTokens || undefined;
}
/**
 * Parses a chat prompt string into a structured format.
 *
 * @template T The expected return type of the parsed prompt.
 * @param {string} prompt The input prompt string to parse.
 * @param {T} defaultValue The default value to return if parsing fails.
 * @returns {T} The parsed prompt or the default value.
 * @throws {Error} If the prompt is invalid YAML or JSON (when required).
 */
function parseChatPrompt(prompt, defaultValue) {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.startsWith('- role:')) {
        try {
            // Try YAML - some legacy OpenAI prompts are YAML :(
            return js_yaml_1.default.load(prompt);
        }
        catch (err) {
            throw new Error(`Chat Completion prompt is not a valid YAML string: ${err}\n\n${prompt}`);
        }
    }
    else {
        try {
            // Try JSON
            return JSON.parse(prompt);
        }
        catch (err) {
            if ((0, envars_1.getEnvBool)('PROMPTFOO_REQUIRE_JSON_PROMPTS') ||
                (trimmedPrompt.startsWith('{') && trimmedPrompt.endsWith('}')) ||
                (trimmedPrompt.startsWith('[') && trimmedPrompt.endsWith(']'))) {
                throw new Error(`Chat Completion prompt is not a valid JSON string: ${err}\n\n${prompt}`);
            }
            // Fall back to the provided default value
            return defaultValue;
        }
    }
}
/**
 * Converts a string to title case.
 *
 * @param {string} str The input string to convert.
 * @returns {string} The input string converted to title case.
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
//# sourceMappingURL=shared.js.map