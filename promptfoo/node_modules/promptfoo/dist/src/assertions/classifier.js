"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClassifier = handleClassifier;
const matchers_1 = require("../matchers");
const invariant_1 = __importDefault(require("../util/invariant"));
async function handleClassifier({ assertion, renderedValue, outputString, test, inverse, }) {
    (0, invariant_1.default)(typeof renderedValue === 'string' || typeof renderedValue === 'undefined', '"classifier" assertion type must have a string value or be undefined');
    // Assertion provider overrides test provider
    const classificationResult = await (0, matchers_1.matchesClassification)(renderedValue, outputString, assertion.threshold ?? 1, test.options);
    if (inverse) {
        classificationResult.pass = !classificationResult.pass;
        classificationResult.score = 1 - classificationResult.score;
    }
    return {
        assertion,
        ...classificationResult,
    };
}
//# sourceMappingURL=classifier.js.map