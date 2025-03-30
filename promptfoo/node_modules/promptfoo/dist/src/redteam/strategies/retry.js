"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deduplicateTests = deduplicateTests;
exports.addRetryTestCases = addRetryTestCases;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../../database");
const tables_1 = require("../../database/tables");
const logger_1 = __importDefault(require("../../logger"));
const invariant_1 = __importDefault(require("../../util/invariant"));
function deduplicateTests(tests) {
    const seen = new Set();
    return tests.filter((test) => {
        const key = JSON.stringify(test.vars);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}
async function getFailedTestCases(pluginId, targetLabel) {
    logger_1.default.debug(`Searching for failed test cases: plugin='${pluginId}', target='${targetLabel}'`);
    const db = (0, database_1.getDb)();
    try {
        const targetResults = await db
            .select()
            .from(tables_1.evalResultsTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(tables_1.evalResultsTable.success, 0), (0, drizzle_orm_1.sql) `json_valid(provider)`, (0, drizzle_orm_1.sql) `json_extract(provider, '$.label') = ${targetLabel}`))
            .orderBy(tables_1.evalResultsTable.createdAt)
            .limit(1);
        if (targetResults.length === 0) {
            logger_1.default.debug(`No failed test cases found for target '${targetLabel}'`);
            return [];
        }
        const results = await db
            .select()
            .from(tables_1.evalResultsTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(tables_1.evalResultsTable.success, 0), (0, drizzle_orm_1.sql) `json_valid(provider)`, (0, drizzle_orm_1.sql) `json_extract(provider, '$.label') = ${targetLabel}`, (0, drizzle_orm_1.sql) `json_valid(test_case)`, (0, drizzle_orm_1.sql) `json_extract(test_case, '$.metadata.pluginId') = ${pluginId}`))
            .orderBy(tables_1.evalResultsTable.createdAt)
            .limit(100);
        const testCases = results
            .map((r) => {
            try {
                const testCase = typeof r.testCase === 'string' ? JSON.parse(r.testCase) : r.testCase;
                const { options: _options, ...rest } = testCase;
                const { strategyConfig: _strategyConfig, ...restMetadata } = rest.metadata || {};
                return {
                    ...rest,
                    ...(testCase.provider ? { provider: testCase.provider } : {}),
                    metadata: {
                        ...restMetadata,
                        originalEvalId: r.evalId,
                        strategyConfig: undefined,
                    },
                    assert: testCase.assert?.map((assertion) => ({
                        ...assertion,
                        metric: assertion.metric?.split('/')[0],
                    })),
                };
            }
            catch (e) {
                logger_1.default.debug(`Failed to parse test case: ${e}`);
                return null;
            }
        })
            .filter((tc) => tc !== null);
        const unique = deduplicateTests(testCases);
        logger_1.default.debug(`Found ${results.length} failed test cases for plugin '${pluginId}' and target '${targetLabel}', ${unique.length} unique`);
        return unique;
    }
    catch (error) {
        logger_1.default.debug(`Error retrieving failed test cases: ${error}`);
        return [];
    }
}
async function addRetryTestCases(testCases, injectVar, config) {
    logger_1.default.debug('Adding retry test cases from previous failures');
    // Group test cases by plugin ID
    const testsByPlugin = new Map();
    for (const test of testCases) {
        const pluginId = test.metadata?.pluginId;
        if (!pluginId) {
            continue;
        }
        if (!testsByPlugin.has(pluginId)) {
            testsByPlugin.set(pluginId, []);
        }
        testsByPlugin.get(pluginId).push(test);
    }
    const targetLabels = (config?.targetLabels ?? []);
    (0, invariant_1.default)(targetLabels.length > 0 && targetLabels.every((label) => typeof label === 'string'), 'No target labels found in config. The retry strategy requires at least one target label to be specified.');
    logger_1.default.debug(`Processing target labels: ${targetLabels.join(', ')}`);
    // For each plugin, get its failed test cases
    const retryTestCases = [];
    for (const targetLabel of targetLabels) {
        for (const [pluginId, tests] of testsByPlugin.entries()) {
            const failedTests = await getFailedTestCases(pluginId, targetLabel);
            // Use configured numTests if available, otherwise use original test count
            const maxTests = typeof config.numTests === 'number' ? config.numTests : tests.length;
            const selected = failedTests.slice(0, maxTests);
            // Get provider configuration from an existing test case if available
            const existingTest = tests.find((t) => t.provider && typeof t.provider === 'object');
            // Ensure each test case has a proper provider configuration
            const withProvider = selected.map((test) => {
                // If test has a provider in object format already, keep it
                if (test.provider && typeof test.provider === 'object') {
                    return test;
                }
                // If test has a string provider, convert it to object format
                if (test.provider && typeof test.provider === 'string') {
                    return {
                        ...test,
                        provider: {
                            id: test.provider,
                            config: {
                                injectVar,
                            },
                        },
                    };
                }
                // If no provider, use the one from existing test if available
                if (existingTest?.provider) {
                    return {
                        ...test,
                        provider: existingTest.provider,
                    };
                }
                return test;
            });
            retryTestCases.push(...withProvider);
        }
    }
    const deduped = deduplicateTests(retryTestCases);
    logger_1.default.debug(`Added ${deduped.length} unique retry test cases`);
    return deduped;
}
//# sourceMappingURL=retry.js.map