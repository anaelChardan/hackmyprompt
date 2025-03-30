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
exports.processJsonlFile = processJsonlFile;
const fs = __importStar(require("fs"));
/**
 * Processes a JSONL file to extract prompts.
 * @param filePath - Path to the JSONL file.
 * @param prompt - The raw prompt data.
 * @returns Array of prompts extracted from the file.
 */
function processJsonlFile(filePath, prompt) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonLines = fileContent.split(/\r?\n/).filter((line) => line.length > 0);
    const containsMultiple = jsonLines.length > 1;
    return jsonLines.map((json) => ({
        raw: json,
        label: containsMultiple
            ? prompt.label
                ? `${prompt.label}: ${json}`
                : `${filePath}: ${json}`
            : prompt.label || `${filePath}`,
        config: prompt.config,
    }));
}
//# sourceMappingURL=jsonl.js.map