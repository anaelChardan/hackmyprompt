"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeEmitAzureOpenAiWarning = maybeEmitAzureOpenAiWarning;
const chalk_1 = __importDefault(require("chalk"));
const assertions_1 = require("../../assertions");
const logger_1 = __importDefault(require("../../logger"));
/**
 * Emits a warning if Azure providers are used with model-graded assertions without
 * explicitly setting a provider for the assertions.
 */
function maybeEmitAzureOpenAiWarning(testSuite, tests) {
    const hasAzure = testSuite.providers.some((p) => p.constructor.name === 'AzureChatCompletionProvider' ||
        p.constructor.name === 'AzureCompletionProvider');
    const hasOpenAi = testSuite.providers.some((p) => p.constructor.name === 'OpenAiChatCompletionProvider' ||
        p.constructor.name === 'OpenAiCompletionProvider' ||
        p.constructor.name === 'OpenAiAssistantProvider');
    if (hasAzure && !hasOpenAi && !testSuite.defaultTest?.options?.provider) {
        const modelGradedAsserts = tests.flatMap((t) => (t.assert || []).filter((a) => a.type !== 'assert-set' &&
            assertions_1.MODEL_GRADED_ASSERTION_TYPES.has(a.type) &&
            !a.provider &&
            !t.options?.provider));
        if (modelGradedAsserts.length > 0) {
            const assertTypes = Array.from(new Set(modelGradedAsserts.map((a) => a.type))).join(', ');
            logger_1.default.warn(chalk_1.default.yellow(`You are using model-graded assertions of types ${chalk_1.default.bold(assertTypes)} while testing an Azure provider. You may need to override these to use your Azure deployment. To learn more, see ${chalk_1.default.bold(`https://promptfoo.dev/docs/providers/azure/#model-graded-tests`)}`));
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=warnings.js.map