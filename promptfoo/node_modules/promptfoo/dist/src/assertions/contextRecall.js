"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContextRecall = void 0;
const matchers_1 = require("../matchers");
const invariant_1 = __importDefault(require("../util/invariant"));
const handleContextRecall = async ({ assertion, renderedValue, prompt, test, }) => {
    (0, invariant_1.default)(typeof renderedValue === 'string', 'context-recall assertion type must have a string value');
    (0, invariant_1.default)(prompt, 'context-recall assertion type must have a prompt');
    return {
        assertion,
        ...(await (0, matchers_1.matchesContextRecall)(typeof test.vars?.context === 'string' ? test.vars.context : prompt, renderedValue, assertion.threshold ?? 0, test.options, test.vars)),
    };
};
exports.handleContextRecall = handleContextRecall;
//# sourceMappingURL=contextRecall.js.map