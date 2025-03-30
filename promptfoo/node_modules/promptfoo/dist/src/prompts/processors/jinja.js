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
exports.processJinjaFile = processJinjaFile;
const fs = __importStar(require("fs"));
/**
 * Processes a Jinja2 template file to extract prompts.
 * Similar to markdown files, each Jinja2 file is treated as a single prompt.
 *
 * @param filePath - Path to the Jinja2 template file.
 * @param prompt - The raw prompt data.
 * @returns Array of one `Prompt` object.
 */
function processJinjaFile(filePath, prompt) {
    const content = fs.readFileSync(filePath, 'utf8');
    return [
        {
            raw: content,
            label: prompt.label || `${filePath}: ${content.slice(0, 50)}...`,
            config: prompt.config,
        },
    ];
}
//# sourceMappingURL=jinja.js.map