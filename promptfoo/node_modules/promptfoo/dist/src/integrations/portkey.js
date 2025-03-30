"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrompt = getPrompt;
const envars_1 = require("../envars");
const invariant_1 = __importDefault(require("../util/invariant"));
async function getPrompt(id, variables) {
    const apiKey = (0, envars_1.getEnvString)('PORTKEY_API_KEY');
    (0, invariant_1.default)(apiKey, 'PORTKEY_API_KEY is required');
    const url = `https://api.portkey.ai/v1/prompts/${id}/render`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-portkey-api-key': apiKey,
        },
        body: JSON.stringify({ variables }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = (await response.json());
    if (!result.success) {
        throw new Error(`Portkey error! ${JSON.stringify(result)}`);
    }
    return result.data;
}
//# sourceMappingURL=portkey.js.map