"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJsonFile = processJsonFile;
const fs = __importStar(require("fs"));
/**
 * Processes a JSON file to extract prompts.
 * This function reads a JSON file and converts it to a `Prompt` object.
 *
 * @param filePath - The path to the JSON file.
 * @param prompt - The raw prompt data, used for labeling.
 * @returns An array of one `Prompt` object.
 * @throws Will throw an error if the file cannot be read.
 */
function processJsonFile(filePath, prompt) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // NOTE: We do not validate if this is a valid JSON file.
    return [
        {
            raw: fileContents,
            label: prompt.label || `${filePath}: ${fileContents}`,
            config: prompt.config,
        },
    ];
}
//# sourceMappingURL=json.js.map