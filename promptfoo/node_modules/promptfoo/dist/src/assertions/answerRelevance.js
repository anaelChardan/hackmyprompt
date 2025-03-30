"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAnswerRelevance = void 0;
const matchers_1 = require("../matchers");
const invariant_1 = __importDefault(require("../util/invariant"));
const handleAnswerRelevance = async ({ assertion, output, prompt, test, }) => {
    (0, invariant_1.default)(typeof output === 'string', 'answer-relevance assertion type must evaluate a string output');
    (0, invariant_1.default)(prompt, 'answer-relevance assertion type must have a prompt');
    const input = typeof test?.vars?.query === 'string' ? test.vars.query : prompt;
    return {
        assertion,
        ...(await (0, matchers_1.matchesAnswerRelevance)(input, output, assertion.threshold ?? 0, test.options)),
    };
};
exports.handleAnswerRelevance = handleAnswerRelevance;
//# sourceMappingURL=answerRelevance.js.map