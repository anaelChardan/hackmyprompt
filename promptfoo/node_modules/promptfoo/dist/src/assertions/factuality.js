"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFactuality = void 0;
const matchers_1 = require("../matchers");
const invariant_1 = __importDefault(require("../util/invariant"));
const templates_1 = require("../util/templates");
const handleFactuality = async ({ assertion, renderedValue, outputString, test, prompt, }) => {
    (0, invariant_1.default)(typeof renderedValue === 'string', 'factuality assertion type must have a string value');
    (0, invariant_1.default)(prompt, 'factuality assertion type must have a prompt');
    if (test.options?.rubricPrompt) {
        // Substitute vars in prompt
        (0, invariant_1.default)(typeof test.options.rubricPrompt === 'string', 'rubricPrompt must be a string');
        const nunjucks = (0, templates_1.getNunjucksEngine)();
        test.options.rubricPrompt = nunjucks.renderString(test.options.rubricPrompt, test.vars || {});
    }
    return {
        assertion,
        ...(await (0, matchers_1.matchesFactuality)(prompt, renderedValue, outputString, test.options, test.vars)),
    };
};
exports.handleFactuality = handleFactuality;
//# sourceMappingURL=factuality.js.map