"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCompositeTestCases = addCompositeTestCases;
const async_1 = __importDefault(require("async"));
const cli_progress_1 = require("cli-progress");
const cache_1 = require("../../cache");
const accounts_1 = require("../../globalConfig/accounts");
const logger_1 = __importDefault(require("../../logger"));
const shared_1 = require("../../providers/shared");
const invariant_1 = __importDefault(require("../../util/invariant"));
const remoteGeneration_1 = require("../remoteGeneration");
async function generateCompositePrompts(testCases, injectVar, config) {
    let progressBar;
    try {
        const concurrency = 10;
        let allResults = [];
        if (logger_1.default.level !== 'debug') {
            progressBar = new cli_progress_1.SingleBar({
                format: 'Composite Jailbreak Generation {bar} {percentage}% | ETA: {eta}s | {value}/{total} cases',
                hideCursor: true,
            }, cli_progress_1.Presets.shades_classic);
            progressBar.start(testCases.length, 0);
        }
        await async_1.default.forEachOfLimit(testCases, concurrency, async (testCase, index) => {
            logger_1.default.debug(`[Composite] Processing test case: ${JSON.stringify(testCase)}`);
            (0, invariant_1.default)(testCase.vars, `Composite: testCase.vars is required, but got ${JSON.stringify(testCase)}`);
            const payload = {
                task: 'jailbreak:composite',
                prompt: testCase.vars[injectVar],
                email: (0, accounts_1.getUserEmail)(),
                ...(config.n && { n: config.n }),
                ...(config.modelFamily && { modelFamily: config.modelFamily }),
            };
            const { data } = await (0, cache_1.fetchWithCache)((0, remoteGeneration_1.getRemoteGenerationUrl)(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }, shared_1.REQUEST_TIMEOUT_MS);
            logger_1.default.debug(`Got composite jailbreak generation result for case ${Number(index) + 1}: ${JSON.stringify(data)}`);
            if (data.error) {
                logger_1.default.error(`[jailbreak:composite] Error in composite generation: ${data.error}}`);
                logger_1.default.debug(`[jailbreak:composite] Response: ${JSON.stringify(data)}`);
                return;
            }
            const compositeTestCases = data.modifiedPrompts.map((modifiedPrompt) => ({
                ...testCase,
                vars: {
                    ...testCase.vars,
                    [injectVar]: modifiedPrompt,
                },
                assert: testCase.assert?.map((assertion) => ({
                    ...assertion,
                    metric: `${assertion.metric}/Composite`,
                })),
                metadata: {
                    ...testCase.metadata,
                    strategyId: 'jailbreak:composite',
                },
            }));
            allResults = allResults.concat(compositeTestCases);
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
        logger_1.default.error(`Error in composite generation: ${error}`);
        return [];
    }
}
async function addCompositeTestCases(testCases, injectVar, config) {
    if ((0, remoteGeneration_1.neverGenerateRemote)()) {
        throw new Error('Composite jailbreak strategy requires remote generation to be enabled');
    }
    const compositeTestCases = await generateCompositePrompts(testCases, injectVar, config);
    if (compositeTestCases.length === 0) {
        logger_1.default.warn('No composite  jailbreak test cases were generated');
    }
    return compositeTestCases;
}
//# sourceMappingURL=singleTurnComposite.js.map