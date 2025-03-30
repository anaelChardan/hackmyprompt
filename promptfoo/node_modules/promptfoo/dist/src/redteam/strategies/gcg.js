"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONCURRENCY = void 0;
exports.addGcgTestCases = addGcgTestCases;
const async_1 = __importDefault(require("async"));
const cli_progress_1 = require("cli-progress");
const cache_1 = require("../../cache");
const accounts_1 = require("../../globalConfig/accounts");
const logger_1 = __importDefault(require("../../logger"));
const shared_1 = require("../../providers/shared");
const invariant_1 = __importDefault(require("../../util/invariant"));
const remoteGeneration_1 = require("../remoteGeneration");
exports.CONCURRENCY = 10;
async function generateGcgPrompts(testCases, injectVar, config) {
    let progressBar;
    try {
        const allResults = [];
        if (logger_1.default.level !== 'debug') {
            progressBar = new cli_progress_1.SingleBar({
                format: 'GCG Generation {bar} {percentage}% | ETA: {eta}s | {value}/{total} cases',
                hideCursor: true,
            }, cli_progress_1.Presets.shades_classic);
            progressBar.start(testCases.length, 0);
        }
        await async_1.default.forEachOfLimit(testCases, exports.CONCURRENCY, async (testCase, index) => {
            logger_1.default.debug(`[GCG] Processing test case: ${JSON.stringify(testCase)}`);
            (0, invariant_1.default)(testCase.vars, `GCG: testCase.vars is required, but got ${JSON.stringify(testCase)}`);
            const payload = {
                task: 'gcg',
                query: testCase.vars[injectVar],
                ...(config.n && { n: config.n }),
                email: (0, accounts_1.getUserEmail)(),
            };
            const { data } = await (0, cache_1.fetchWithCache)((0, remoteGeneration_1.getRemoteGenerationUrl)(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }, shared_1.REQUEST_TIMEOUT_MS);
            logger_1.default.debug(`Got GCG generation result for case ${Number(index) + 1}: ${JSON.stringify(data)}`);
            if (data.error) {
                logger_1.default.error(`[GCG] Error in GCG generation: ${data.error}`);
                logger_1.default.debug(`[GCG] Response: ${JSON.stringify(data)}`);
                return;
            }
            // Handle both single response and array of responses
            const responses = data.responses;
            const gcgTestCases = responses.map((response) => ({
                ...testCase,
                vars: {
                    ...testCase.vars,
                    [injectVar]: response,
                },
                assert: testCase.assert?.map((assertion) => ({
                    ...assertion,
                    metric: `${assertion.metric}/GCG`,
                })),
                metadata: {
                    ...testCase.metadata,
                    strategyId: 'gcg',
                },
            }));
            allResults.push(...gcgTestCases);
            if (progressBar) {
                progressBar.increment(1);
            }
            else {
                logger_1.default.debug(`Processed case ${Number(index) + 1} of ${testCases.length}`);
            }
        });
        if (progressBar) {
            progressBar.stop();
        }
        return allResults;
    }
    catch (error) {
        if (progressBar) {
            progressBar.stop();
        }
        logger_1.default.error(`Error in GCG generation: ${error}`);
        return [];
    }
}
async function addGcgTestCases(testCases, injectVar, config) {
    if ((0, remoteGeneration_1.neverGenerateRemote)()) {
        throw new Error('GCG strategy requires remote generation to be enabled');
    }
    const gcgTestCases = await generateGcgPrompts(testCases, injectVar, config);
    if (gcgTestCases.length === 0) {
        logger_1.default.warn('No GCG test cases were generated');
    }
    return gcgTestCases;
}
//# sourceMappingURL=gcg.js.map