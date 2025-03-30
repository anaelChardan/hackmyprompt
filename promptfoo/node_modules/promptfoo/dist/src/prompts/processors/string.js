"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processString = processString;
const invariant_1 = __importDefault(require("../../util/invariant"));
/**
 * Processes a string as a literal prompt.
 * @param prompt - The raw prompt data.
 * @returns Array of prompts created from the string.
 */
function processString(prompt) {
    (0, invariant_1.default)(typeof prompt.raw === 'string', `prompt.raw must be a string, but got ${JSON.stringify(prompt.raw)}`);
    return [
        {
            raw: prompt.raw,
            label: prompt.label ?? `${prompt.raw}`,
            config: prompt.config,
        },
    ];
}
//# sourceMappingURL=string.js.map