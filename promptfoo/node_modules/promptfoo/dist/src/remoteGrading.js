"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doRemoteGrading = doRemoteGrading;
const cache_1 = require("./cache");
const accounts_1 = require("./globalConfig/accounts");
const logger_1 = __importDefault(require("./logger"));
const shared_1 = require("./providers/shared");
const remoteGeneration_1 = require("./redteam/remoteGeneration");
async function doRemoteGrading(payload) {
    try {
        payload.email = (0, accounts_1.getUserEmail)();
        const body = JSON.stringify(payload);
        logger_1.default.debug(`Performing remote grading: ${body}`);
        const { data } = await (0, cache_1.fetchWithCache)((0, remoteGeneration_1.getRemoteGenerationUrl)(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        }, shared_1.REQUEST_TIMEOUT_MS);
        const { result } = data;
        logger_1.default.debug(`Got remote grading result: ${JSON.stringify(result)}`);
        return {
            pass: result.pass,
            score: result.score,
            reason: result.reason,
            tokensUsed: result.tokensUsed,
        };
    }
    catch (error) {
        throw new Error(`Could not perform remote grading: ${error}`);
    }
}
//# sourceMappingURL=remoteGrading.js.map