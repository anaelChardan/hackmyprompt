"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegex = void 0;
const invariant_1 = __importDefault(require("../util/invariant"));
const handleRegex = ({ assertion, renderedValue, outputString, inverse, }) => {
    (0, invariant_1.default)(renderedValue, '"regex" assertion type must have a string value');
    (0, invariant_1.default)(typeof renderedValue === 'string', '"regex" assertion type must have a string value');
    let regex;
    try {
        regex = new RegExp(renderedValue);
    }
    catch (error) {
        return {
            pass: false,
            score: 0,
            reason: `Invalid regex pattern: ${error instanceof Error ? error.message : 'unknown error'}`,
            assertion,
        };
    }
    const pass = regex.test(outputString) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}match regex "${renderedValue}"`,
        assertion,
    };
};
exports.handleRegex = handleRegex;
//# sourceMappingURL=regex.js.map