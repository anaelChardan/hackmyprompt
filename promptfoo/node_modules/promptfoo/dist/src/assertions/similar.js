"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSimilar = void 0;
const matchers_1 = require("../matchers");
const invariant_1 = __importDefault(require("../util/invariant"));
const handleSimilar = async ({ assertion, renderedValue, outputString, inverse, test, }) => {
    (0, invariant_1.default)(typeof renderedValue === 'string' || Array.isArray(renderedValue), 'Similarity assertion type must have a string or array of strings value');
    const threshold = assertion.threshold ?? 0.75;
    if (Array.isArray(renderedValue)) {
        let minScore = Infinity;
        for (const value of renderedValue) {
            const result = await (0, matchers_1.matchesSimilarity)(value, outputString, threshold, inverse, test.options);
            if (result.pass) {
                return {
                    assertion,
                    ...result,
                };
            }
            if (result.score < minScore) {
                minScore = result.score;
            }
        }
        return {
            assertion,
            pass: false,
            score: minScore,
            reason: `None of the provided values met the similarity threshold`,
        };
    }
    else {
        return {
            assertion,
            ...(await (0, matchers_1.matchesSimilarity)(renderedValue, outputString, threshold, inverse, test.options)),
        };
    }
};
exports.handleSimilar = handleSimilar;
//# sourceMappingURL=similar.js.map