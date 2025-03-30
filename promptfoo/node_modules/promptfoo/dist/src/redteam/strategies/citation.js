"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCitationTestCases = addCitationTestCases;
const async_1 = __importDefault(require("async"));
const cli_progress_1 = require("cli-progress");
const dedent_1 = __importDefault(require("dedent"));
const cache_1 = require("../../cache");
const accounts_1 = require("../../globalConfig/accounts");
const logger_1 = __importDefault(require("../../logger"));
const shared_1 = require("../../providers/shared");
const invariant_1 = __importDefault(require("../../util/invariant"));
const remoteGeneration_1 = require("../remoteGeneration");
async function generateCitations(testCases, injectVar, config) {
    let progressBar;
    try {
        const concurrency = 10;
        const allResults = [];
        if (logger_1.default.level !== 'debug') {
            progressBar = new cli_progress_1.SingleBar({
                format: 'Citation Generation {bar} {percentage}% | ETA: {eta}s | {value}/{total} cases',
                hideCursor: true,
            }, cli_progress_1.Presets.shades_classic);
            progressBar.start(testCases.length, 0);
        }
        await async_1.default.forEachOfLimit(testCases, concurrency, async (testCase, index) => {
            (0, invariant_1.default)(testCase.vars, `Citation: testCase.vars is required, but got ${JSON.stringify(testCase)}`);
            const payload = {
                task: 'citation',
                testCases: [testCase],
                injectVar,
                topic: testCase.vars[injectVar],
                config,
                email: (0, accounts_1.getUserEmail)(),
            };
            const { data } = await (0, cache_1.fetchWithCache)((0, remoteGeneration_1.getRemoteGenerationUrl)(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }, shared_1.REQUEST_TIMEOUT_MS);
            logger_1.default.debug(`Got remote citation generation result for case ${Number(index) + 1}: ${JSON.stringify(data)}`);
            const citationTestCase = {
                ...testCase,
                vars: {
                    ...testCase.vars,
                    [injectVar]: (0, dedent_1.default) `
            Based on the following ${data.result.citation.type.toLowerCase()}, ${testCase.vars[injectVar]}

          Reference:
          1. ${data.result.citation.content}
        `,
                },
                assert: testCase.assert?.map((assertion) => ({
                    ...assertion,
                    metric: `${assertion.metric}/Citation`,
                })),
                metadata: {
                    ...testCase.metadata,
                    citation: data.result.citation,
                    strategyId: 'citation',
                },
            };
            allResults.push(citationTestCase);
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
        logger_1.default.error(`Error in remote citation generation: ${error}`);
        return [];
    }
}
async function addCitationTestCases(testCases, injectVar, config) {
    if ((0, remoteGeneration_1.neverGenerateRemote)()) {
        throw new Error('Citation strategy requires remote generation to be enabled');
    }
    const citationTestCases = await generateCitations(testCases, injectVar, config);
    if (citationTestCases.length === 0) {
        logger_1.default.warn('No citation test cases were generated');
    }
    return citationTestCases;
}
//# sourceMappingURL=citation.js.map