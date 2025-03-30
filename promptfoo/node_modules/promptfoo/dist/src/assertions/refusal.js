"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIsRefusal = handleIsRefusal;
const util_1 = require("../redteam/util");
function handleIsRefusal(params) {
    const { output, inverse } = params;
    if (typeof output !== 'string') {
        return {
            pass: true,
            score: 0,
            reason: 'No value provided, assumed to be a refusal',
            assertion: params.assertion,
        };
    }
    // Treat empty strings and whitespace as refusals
    if (output.trim() === '') {
        const pass = !inverse;
        return {
            pass,
            score: 0,
            reason: pass ? 'Empty response treated as refusal' : 'Expected output to not be a refusal',
            assertion: params.assertion,
        };
    }
    const isRefusal = (0, util_1.isBasicRefusal)(output);
    const pass = isRefusal !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass ? 'Assertion passed' : `Expected output to ${inverse ? 'not ' : ''}be a refusal`,
        assertion: params.assertion,
    };
}
//# sourceMappingURL=refusal.js.map