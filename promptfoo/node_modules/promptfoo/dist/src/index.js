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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardrails = exports.redteam = exports.loadApiProvider = exports.cache = exports.assertions = exports.generateTable = void 0;
exports.evaluate = evaluate;
const assertions_1 = __importDefault(require("./assertions"));
exports.assertions = assertions_1.default;
const cache = __importStar(require("./cache"));
exports.cache = cache;
const evaluator_1 = require("./evaluator");
const guardrails_1 = __importDefault(require("./guardrails"));
exports.guardrails = guardrails_1.default;
const migrate_1 = require("./migrate");
const eval_1 = __importDefault(require("./models/eval"));
const prompts_1 = require("./prompts");
const providers_1 = require("./providers");
Object.defineProperty(exports, "loadApiProvider", { enumerable: true, get: function () { return providers_1.loadApiProvider; } });
const entities_1 = require("./redteam/extraction/entities");
const purpose_1 = require("./redteam/extraction/purpose");
const graders_1 = require("./redteam/graders");
const plugins_1 = require("./redteam/plugins");
const base_1 = require("./redteam/plugins/base");
const strategies_1 = require("./redteam/strategies");
const telemetry_1 = __importDefault(require("./telemetry"));
const util_1 = require("./util");
const invariant_1 = __importDefault(require("./util/invariant"));
const testCaseReader_1 = require("./util/testCaseReader");
__exportStar(require("./types"), exports);
var table_1 = require("./table");
Object.defineProperty(exports, "generateTable", { enumerable: true, get: function () { return table_1.generateTable; } });
async function evaluate(testSuite, options = {}) {
    if (testSuite.writeLatestResults) {
        await (0, migrate_1.runDbMigrations)();
    }
    const constructedTestSuite = {
        ...testSuite,
        scenarios: testSuite.scenarios,
        providers: await (0, providers_1.loadApiProviders)(testSuite.providers, {
            env: testSuite.env,
        }),
        tests: await (0, testCaseReader_1.readTests)(testSuite.tests),
        nunjucksFilters: await (0, util_1.readFilters)(testSuite.nunjucksFilters || {}),
        // Full prompts expected (not filepaths)
        prompts: await (0, prompts_1.processPrompts)(testSuite.prompts),
    };
    // Resolve nested providers
    if (constructedTestSuite.defaultTest?.options?.provider) {
        if (typeof constructedTestSuite.defaultTest.options.provider === 'function') {
            constructedTestSuite.defaultTest.options.provider = await (0, providers_1.loadApiProvider)(constructedTestSuite.defaultTest.options.provider);
        }
        else if (typeof constructedTestSuite.defaultTest.options.provider === 'object') {
            const casted = constructedTestSuite.defaultTest.options.provider;
            (0, invariant_1.default)(casted.id, 'Provider object must have an id');
            constructedTestSuite.defaultTest.options.provider = await (0, providers_1.loadApiProvider)(casted.id, {
                options: casted,
            });
        }
    }
    for (const test of constructedTestSuite.tests || []) {
        if (test.options?.provider && typeof test.options.provider === 'function') {
            test.options.provider = await (0, providers_1.loadApiProvider)(test.options.provider);
        }
        else if (test.options?.provider && typeof test.options.provider === 'object') {
            const casted = test.options.provider;
            (0, invariant_1.default)(casted.id, 'Provider object must have an id');
            test.options.provider = await (0, providers_1.loadApiProvider)(casted.id, { options: casted });
        }
        if (test.assert) {
            for (const assertion of test.assert) {
                if (assertion.type === 'assert-set' || typeof assertion.provider === 'function') {
                    continue;
                }
                if (assertion.provider) {
                    if (typeof assertion.provider === 'object') {
                        const casted = assertion.provider;
                        (0, invariant_1.default)(casted.id, 'Provider object must have an id');
                        assertion.provider = await (0, providers_1.loadApiProvider)(casted.id, { options: casted });
                    }
                    else if (typeof assertion.provider === 'string') {
                        assertion.provider = await (0, providers_1.loadApiProvider)(assertion.provider);
                    }
                    else {
                        throw new Error('Invalid provider type');
                    }
                }
            }
        }
    }
    // Other settings
    if (options.cache === false || (options.repeat && options.repeat > 1)) {
        cache.disableCache();
    }
    const parsedProviderPromptMap = (0, prompts_1.readProviderPromptMap)(testSuite, constructedTestSuite.prompts);
    const unifiedConfig = { ...testSuite, prompts: constructedTestSuite.prompts };
    const evalRecord = testSuite.writeLatestResults
        ? await eval_1.default.create(unifiedConfig, constructedTestSuite.prompts)
        : new eval_1.default(unifiedConfig);
    // Run the eval!
    const ret = await (0, evaluator_1.evaluate)({
        ...constructedTestSuite,
        providerPromptMap: parsedProviderPromptMap,
    }, evalRecord, {
        eventSource: 'library',
        ...options,
    });
    if (testSuite.outputPath) {
        if (typeof testSuite.outputPath === 'string') {
            await (0, util_1.writeOutput)(testSuite.outputPath, evalRecord, null);
        }
        else if (Array.isArray(testSuite.outputPath)) {
            await (0, util_1.writeMultipleOutputs)(testSuite.outputPath, evalRecord, null);
        }
    }
    await telemetry_1.default.send();
    return ret;
}
const redteam = {
    Extractors: {
        extractEntities: entities_1.extractEntities,
        extractSystemPurpose: purpose_1.extractSystemPurpose,
    },
    Graders: graders_1.GRADERS,
    Plugins: plugins_1.Plugins,
    Strategies: strategies_1.Strategies,
    Base: {
        Plugin: base_1.RedteamPluginBase,
        Grader: base_1.RedteamGraderBase,
    },
};
exports.redteam = redteam;
exports.default = {
    assertions: assertions_1.default,
    cache,
    evaluate,
    loadApiProvider: providers_1.loadApiProvider,
    redteam,
    guardrails: guardrails_1.default,
};
//# sourceMappingURL=index.js.map