"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = handleWebhook;
const envars_1 = require("../envars");
const fetch_1 = require("../fetch");
const invariant_1 = __importDefault(require("../util/invariant"));
async function handleWebhook({ assertion, renderedValue, test, prompt, output, inverse, }) {
    (0, invariant_1.default)(renderedValue, '"webhook" assertion type must have a URL value');
    (0, invariant_1.default)(typeof renderedValue === 'string', '"webhook" assertion type must have a URL value');
    try {
        const context = {
            prompt,
            vars: test.vars || {},
        };
        const response = await (0, fetch_1.fetchWithRetries)(renderedValue, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ output, context }),
        }, (0, envars_1.getEnvInt)('WEBHOOK_TIMEOUT', 5000));
        if (!response.ok) {
            throw new Error(`Webhook response status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        const pass = jsonResponse.pass !== inverse;
        const score = typeof jsonResponse.score === 'undefined'
            ? pass
                ? 1
                : 0
            : inverse
                ? 1 - jsonResponse.score
                : jsonResponse.score;
        const reason = jsonResponse.reason ||
            (pass ? 'Assertion passed' : `Webhook returned ${inverse ? 'true' : 'false'}`);
        return {
            pass,
            score,
            reason,
            assertion,
        };
    }
    catch (err) {
        return {
            pass: false,
            score: 0,
            reason: `Webhook error: ${err.message}`,
            assertion,
        };
    }
}
//# sourceMappingURL=webhook.js.map