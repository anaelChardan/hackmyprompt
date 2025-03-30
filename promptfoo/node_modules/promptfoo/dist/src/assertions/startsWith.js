"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStartsWith = void 0;
const invariant_1 = __importDefault(require("../util/invariant"));
const handleStartsWith = ({ assertion, renderedValue, outputString, inverse, }) => {
    (0, invariant_1.default)(renderedValue, '"starts-with" assertion type must have a string value');
    (0, invariant_1.default)(typeof renderedValue === 'string', '"starts-with" assertion type must have a string value');
    const pass = outputString.startsWith(String(renderedValue)) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}start with "${renderedValue}"`,
        assertion,
    };
};
exports.handleStartsWith = handleStartsWith;
//# sourceMappingURL=startsWith.js.map