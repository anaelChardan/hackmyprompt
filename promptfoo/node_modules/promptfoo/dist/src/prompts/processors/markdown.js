"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMarkdownFile = processMarkdownFile;
const fs_1 = __importDefault(require("fs"));
function processMarkdownFile(filePath, prompt) {
    const content = fs_1.default.readFileSync(filePath, 'utf8');
    return [
        {
            raw: content,
            label: prompt.label || `${filePath}: ${content.slice(0, 50)}...`,
        },
    ];
}
//# sourceMappingURL=markdown.js.map