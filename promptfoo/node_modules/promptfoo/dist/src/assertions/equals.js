"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEquals = void 0;
const util_1 = __importDefault(require("util"));
const handleEquals = async ({ assertion, renderedValue, outputString, inverse, }) => {
    let pass;
    if (typeof renderedValue === 'object') {
        try {
            pass = util_1.default.isDeepStrictEqual(renderedValue, JSON.parse(outputString)) !== inverse;
        }
        catch {
            pass = false;
        }
        renderedValue = JSON.stringify(renderedValue);
    }
    else {
        pass = (String(renderedValue) === outputString) !== inverse;
    }
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output "${outputString}" to ${inverse ? 'not ' : ''}equal "${renderedValue}"`,
        assertion,
    };
};
exports.handleEquals = handleEquals;
//# sourceMappingURL=equals.js.map