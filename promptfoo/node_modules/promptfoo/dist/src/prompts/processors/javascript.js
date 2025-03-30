"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformContext = void 0;
exports.processJsFile = processJsFile;
const esm_1 = require("../../esm");
const invariant_1 = __importDefault(require("../../util/invariant"));
const transformContext = (context) => {
    (0, invariant_1.default)(context.provider, 'Provider is required');
    return {
        vars: context.vars,
        provider: { id: context.provider.id(), label: context.provider.label },
        config: context.config ?? {},
    };
};
exports.transformContext = transformContext;
/**
 * Processes a JavaScript file to import and execute a module function as a prompt.
 * @param filePath - Path to the JavaScript file.
 * @param functionName - Optional function name to execute.
 * @returns Promise resolving to an array of prompts.
 */
async function processJsFile(filePath, prompt, functionName) {
    const promptFunction = await (0, esm_1.importModule)(filePath, functionName);
    return [
        {
            raw: String(promptFunction),
            label: prompt.label ? prompt.label : functionName ? `${filePath}:${functionName}` : filePath,
            function: (context) => promptFunction((0, exports.transformContext)({
                ...context,
                config: prompt.config ?? {},
            })),
            config: prompt.config ?? {},
        },
    ];
}
//# sourceMappingURL=javascript.js.map