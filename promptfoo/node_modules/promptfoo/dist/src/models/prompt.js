"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIdFromPrompt = generateIdFromPrompt;
const createHash_1 = require("../util/createHash");
function generateIdFromPrompt(prompt) {
    return prompt.id || prompt.label
        ? (0, createHash_1.sha256)(prompt.label)
        : (0, createHash_1.sha256)(typeof prompt.raw === 'object' ? JSON.stringify(prompt.raw) : prompt.raw);
}
//# sourceMappingURL=prompt.js.map