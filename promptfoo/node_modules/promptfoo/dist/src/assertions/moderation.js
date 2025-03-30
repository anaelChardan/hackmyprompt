"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleModeration = void 0;
const matchers_1 = require("../matchers");
const shared_1 = require("../providers/shared");
const invariant_1 = __importDefault(require("../util/invariant"));
const handleModeration = async ({ assertion, test, outputString, providerResponse, prompt, }) => {
    // Some redteam techniques override the actual prompt that is used, so we need to assess that prompt for moderation.
    const promptToModerate = providerResponse.metadata?.redteamFinalPrompt || prompt;
    (0, invariant_1.default)(promptToModerate, 'moderation assertion type must have a prompt');
    (0, invariant_1.default)(!assertion.value || (Array.isArray(assertion.value) && typeof assertion.value[0] === 'string'), 'moderation assertion value must be a string array if set');
    if (promptToModerate[0] === '[' || promptToModerate[0] === '{') {
        // Try to extract the last user message from OpenAI-style prompts.
        try {
            const parsedPrompt = (0, shared_1.parseChatPrompt)(promptToModerate, null);
            if (parsedPrompt && parsedPrompt.length > 0) {
                prompt = parsedPrompt[parsedPrompt.length - 1].content;
            }
        }
        catch {
            // Ignore error
        }
    }
    const moderationResult = await (0, matchers_1.matchesModeration)({
        userPrompt: promptToModerate,
        assistantResponse: outputString,
        categories: Array.isArray(assertion.value) ? assertion.value : [],
    }, test.options);
    const pass = moderationResult.pass;
    return {
        pass,
        score: moderationResult.score,
        reason: moderationResult.reason,
        assertion,
    };
};
exports.handleModeration = handleModeration;
//# sourceMappingURL=moderation.js.map