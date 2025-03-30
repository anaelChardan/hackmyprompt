"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesToRedteamHistory = exports.getLastMessageContent = exports.redteamProviderManager = void 0;
exports.getTargetResponse = getTargetResponse;
exports.checkPenalizedPhrases = checkPenalizedPhrases;
const cliState_1 = __importDefault(require("../../cliState"));
const logger_1 = __importDefault(require("../../logger"));
const chat_1 = require("../../providers/openai/chat");
const types_1 = require("../../types");
const json_1 = require("../../util/json");
const time_1 = require("../../util/time");
const constants_1 = require("./constants");
async function loadRedteamProvider({ provider, jsonOnly = false, preferSmallModel = false, } = {}) {
    let ret;
    const redteamProvider = provider || cliState_1.default.config?.redteam?.provider;
    if ((0, types_1.isApiProvider)(redteamProvider)) {
        logger_1.default.debug(`Using redteam provider: ${redteamProvider}`);
        ret = redteamProvider;
    }
    else if (typeof redteamProvider === 'string' || (0, types_1.isProviderOptions)(redteamProvider)) {
        logger_1.default.debug(`Loading redteam provider: ${JSON.stringify(redteamProvider)}`);
        const loadApiProvidersModule = await Promise.resolve().then(() => __importStar(require('../../providers')));
        // Async import to avoid circular dependency
        ret = (await loadApiProvidersModule.loadApiProviders([redteamProvider]))[0];
    }
    else {
        const defaultModel = preferSmallModel ? constants_1.ATTACKER_MODEL_SMALL : constants_1.ATTACKER_MODEL;
        logger_1.default.debug(`Using default redteam provider: ${defaultModel}`);
        ret = new chat_1.OpenAiChatCompletionProvider(defaultModel, {
            config: {
                temperature: constants_1.TEMPERATURE,
                response_format: jsonOnly ? { type: 'json_object' } : undefined,
            },
        });
    }
    return ret;
}
class RedteamProviderManager {
    clearProvider() {
        this.provider = undefined;
        this.jsonOnlyProvider = undefined;
    }
    async setProvider(provider) {
        this.provider = await loadRedteamProvider({ provider });
        this.jsonOnlyProvider = await loadRedteamProvider({ provider, jsonOnly: true });
    }
    async getProvider({ provider, jsonOnly = false, preferSmallModel = false, }) {
        if (this.provider && this.jsonOnlyProvider) {
            logger_1.default.debug(`[RedteamProviderManager] Using cached redteam provider: ${this.provider.id()}`);
            return jsonOnly ? this.jsonOnlyProvider : this.provider;
        }
        logger_1.default.debug(`[RedteamProviderManager] Loading redteam provider: ${JSON.stringify({
            providedConfig: typeof provider == 'string' ? provider : (provider?.id ?? 'none'),
            jsonOnly,
            preferSmallModel,
        })}`);
        const redteamProvider = await loadRedteamProvider({ provider, jsonOnly, preferSmallModel });
        logger_1.default.debug(`[RedteamProviderManager] Loaded redteam provider: ${redteamProvider.id()}`);
        return redteamProvider;
    }
}
exports.redteamProviderManager = new RedteamProviderManager();
/**
 * Gets the response from the target provider for a given prompt.
 * @param targetProvider - The API provider to get the response from.
 * @param targetPrompt - The prompt to send to the target provider.
 * @returns A promise that resolves to the target provider's response as an object.
 */
async function getTargetResponse(targetProvider, targetPrompt, context, options) {
    let targetRespRaw;
    try {
        targetRespRaw = await targetProvider.callApi(targetPrompt, context, options);
    }
    catch (error) {
        return { output: '', error: error.message, tokenUsage: { numRequests: 1 } };
    }
    if (!targetRespRaw.cached && targetProvider.delay && targetProvider.delay > 0) {
        logger_1.default.debug(`Sleeping for ${targetProvider.delay}ms`);
        await (0, time_1.sleep)(targetProvider.delay);
    }
    if (targetRespRaw?.output) {
        const output = (typeof targetRespRaw.output === 'string'
            ? targetRespRaw.output
            : (0, json_1.safeJsonStringify)(targetRespRaw.output));
        return {
            output,
            sessionId: targetRespRaw.sessionId,
            tokenUsage: targetRespRaw.tokenUsage || { numRequests: 1 },
            guardrails: targetRespRaw.guardrails,
        };
    }
    if (targetRespRaw?.error) {
        return {
            output: '',
            error: targetRespRaw.error,
            sessionId: targetRespRaw.sessionId,
            tokenUsage: { numRequests: 1 },
            guardrails: targetRespRaw.guardrails,
        };
    }
    throw new Error(`
    Target returned malformed response: expected either \`output\` or \`error\` to be set.
    
    Instead got: ${(0, json_1.safeJsonStringify)(targetRespRaw)}
    `);
}
const getLastMessageContent = (messages, role) => messages.filter((m) => m?.role === role).slice(-1)[0]?.content;
exports.getLastMessageContent = getLastMessageContent;
/**
 * Converts an array of messages to the redteamHistory format
 * @param messages Array of messages with role and content
 * @returns Array of prompt-output pairs, or empty array if conversion fails
 */
const messagesToRedteamHistory = (messages) => {
    try {
        return messages.reduce((acc, msg, i, arr) => {
            if (msg?.role === 'user' && i < arr.length - 1 && arr[i + 1]?.role === 'assistant') {
                acc.push({
                    prompt: msg.content || '',
                    output: arr[i + 1].content || '',
                });
            }
            return acc;
        }, []);
    }
    catch (error) {
        logger_1.default.debug(`Failed to convert messages to redteamHistory: ${error}`);
        return [];
    }
};
exports.messagesToRedteamHistory = messagesToRedteamHistory;
function checkPenalizedPhrases(output) {
    const partialMatchPhrases = ['in the face of impending doom', 'science fiction'];
    const exactMatchPhrases = ['yes, i can help you', 'yes, i can help you with that'];
    const hasPartialMatch = partialMatchPhrases.some((phrase) => output.toLowerCase().includes(phrase));
    const hasExactMatch = exactMatchPhrases.includes(output.toLowerCase().trim());
    return hasPartialMatch || hasExactMatch;
}
//# sourceMappingURL=shared.js.map