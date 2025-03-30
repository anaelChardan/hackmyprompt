"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrompts = generatePrompts;
const prompts_1 = require("./prompts");
const defaults_1 = require("./providers/openai/defaults");
async function generatePrompts(prompt, num) {
    const provider = defaults_1.DefaultSuggestionsProvider;
    const resp = await provider.callApi(JSON.stringify([
        prompts_1.SUGGEST_PROMPTS_SYSTEM_MESSAGE,
        {
            role: 'user',
            content: 'Generate a variant for the following prompt:',
        },
        {
            role: 'user',
            content: prompt,
        },
    ]));
    if (resp.error || !resp.output) {
        return {
            error: resp.error || 'Unknown error',
            tokensUsed: {
                total: resp.tokenUsage?.total || 0,
                prompt: resp.tokenUsage?.prompt || 0,
                completion: resp.tokenUsage?.completion || 0,
                completionDetails: resp.tokenUsage?.completionDetails || {
                    reasoning: 0,
                    acceptedPrediction: 0,
                    rejectedPrediction: 0,
                },
            },
        };
    }
    try {
        return {
            prompts: [String(resp.output)],
            tokensUsed: {
                total: resp.tokenUsage?.total || 0,
                prompt: resp.tokenUsage?.prompt || 0,
                completion: resp.tokenUsage?.completion || 0,
                completionDetails: resp.tokenUsage?.completionDetails || {
                    reasoning: 0,
                    acceptedPrediction: 0,
                    rejectedPrediction: 0,
                },
            },
        };
    }
    catch {
        return {
            error: `Output is not valid JSON: ${resp.output}`,
            tokensUsed: {
                total: resp.tokenUsage?.total || 0,
                prompt: resp.tokenUsage?.prompt || 0,
                completion: resp.tokenUsage?.completion || 0,
                completionDetails: resp.tokenUsage?.completionDetails || {
                    reasoning: 0,
                    acceptedPrediction: 0,
                    rejectedPrediction: 0,
                },
            },
        };
    }
}
//# sourceMappingURL=suggestions.js.map