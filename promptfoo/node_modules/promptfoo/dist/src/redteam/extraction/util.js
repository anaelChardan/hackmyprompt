"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedTeamGenerationResponse = void 0;
exports.fetchRemoteGeneration = fetchRemoteGeneration;
exports.callExtraction = callExtraction;
exports.formatPrompts = formatPrompts;
const dedent_1 = __importDefault(require("dedent"));
const zod_1 = require("zod");
const cache_1 = require("../../cache");
const constants_1 = require("../../constants");
const envars_1 = require("../../envars");
const accounts_1 = require("../../globalConfig/accounts");
const logger_1 = __importDefault(require("../../logger"));
const shared_1 = require("../../providers/shared");
const invariant_1 = __importDefault(require("../../util/invariant"));
const remoteGeneration_1 = require("../remoteGeneration");
exports.RedTeamGenerationResponse = zod_1.z.object({
    task: zod_1.z.string(),
    result: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]),
});
/**
 * Fetches remote generation results for a given task and prompts.
 *
 * @param task - The type of task to perform ('purpose' or 'entities').
 * @param prompts - An array of prompts to process.
 * @returns A Promise that resolves to either a string or an array of strings, depending on the task.
 * @throws Will throw an error if the remote generation fails.
 *
 * @example
 * ```typescript
 * const result = await fetchRemoteGeneration('purpose', ['What is the purpose of this app?']);
 * console.log(result); // Outputs the generated purpose as a string
 * ```
 */
async function fetchRemoteGeneration(task, prompts) {
    (0, invariant_1.default)(!(0, envars_1.getEnvBool)('PROMPTFOO_DISABLE_REDTEAM_REMOTE_GENERATION'), 'fetchRemoteGeneration should never be called when remote generation is disabled');
    try {
        const body = {
            task,
            prompts,
            version: constants_1.VERSION,
            email: (0, accounts_1.getUserEmail)(),
        };
        const response = await (0, cache_1.fetchWithCache)((0, remoteGeneration_1.getRemoteGenerationUrl)(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }, shared_1.REQUEST_TIMEOUT_MS, 'json');
        const parsedResponse = exports.RedTeamGenerationResponse.parse(response.data);
        return parsedResponse.result;
    }
    catch (error) {
        logger_1.default.warn(`Error using remote generation for task '${task}': ${error}`);
        throw error;
    }
}
async function callExtraction(provider, prompt, processOutput) {
    const { output, error } = await provider.callApi(JSON.stringify([{ role: 'user', content: prompt }]));
    if (error) {
        logger_1.default.error(`Error in extraction: ${error}`);
        throw new Error(`Failed to perform extraction: ${error}`);
    }
    if (typeof output !== 'string') {
        logger_1.default.error(`Invalid output from extraction. Got: ${output}`);
        throw new Error(`Invalid extraction output: expected string, got: ${output}`);
    }
    return processOutput(output);
}
function formatPrompts(prompts) {
    return prompts
        .map((prompt) => (0, dedent_1.default) `
    <Prompt>
    ${prompt}
    </Prompt>`)
        .join('\n');
}
//# sourceMappingURL=util.js.map