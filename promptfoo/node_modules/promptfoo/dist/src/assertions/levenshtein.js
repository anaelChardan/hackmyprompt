"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLevenshtein = handleLevenshtein;
const fastest_levenshtein_1 = require("fastest-levenshtein");
const invariant_1 = __importDefault(require("../util/invariant"));
function handleLevenshtein({ assertion, renderedValue, outputString, }) {
    (0, invariant_1.default)(typeof renderedValue === 'string', '"levenshtein" assertion type must have a string value');
    const levDistance = (0, fastest_levenshtein_1.distance)(outputString, renderedValue);
    const threshold = assertion.threshold ?? 5;
    const pass = levDistance <= threshold;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Levenshtein distance ${levDistance} is greater than threshold ${threshold}`,
        assertion,
    };
}
//# sourceMappingURL=levenshtein.js.map