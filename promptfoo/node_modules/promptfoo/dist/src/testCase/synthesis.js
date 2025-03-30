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
exports.generatePersonasPrompt = generatePersonasPrompt;
exports.testCasesPrompt = testCasesPrompt;
exports.synthesize = synthesize;
exports.synthesizeFromTestSuite = synthesizeFromTestSuite;
const dedent_1 = __importDefault(require("dedent"));
const logger_1 = __importDefault(require("../logger"));
const providers_1 = require("../providers");
const defaults_1 = require("../providers/defaults");
const generation_1 = require("../util/generation");
const invariant_1 = __importDefault(require("../util/invariant"));
const json_1 = require("../util/json");
const templates_1 = require("../util/templates");
function generatePersonasPrompt(prompts, numPersonas) {
    const promptsString = (0, dedent_1.default) `<Prompts>
    ${prompts.map((prompt) => `<Prompt>\n${prompt}\n</Prompt>`).join('\n')}
    </Prompts>`;
    return (0, dedent_1.default) `
    Consider the following prompt${prompts.length > 1 ? 's' : ''} for an LLM application:

    ${promptsString}

    List up to ${numPersonas} user personas that would send ${prompts.length > 1 ? 'these prompts' : 'this prompt'}. Your response should be JSON of the form {personas: string[]}`;
}
function testCasesPrompt(prompts, persona, tests, numTestCasesPerPersona, variables, instructions) {
    const promptsString = (0, dedent_1.default) `
    <Prompts>
    ${prompts
        .map((prompt) => (0, dedent_1.default) `
      <Prompt>
      ${prompt}
      </Prompt>`)
        .join('\n')}
    </Prompts>`;
    const existingTests = (0, dedent_1.default) `
    Here are some existing tests:
    ${(0, generation_1.sampleArray)(tests, 100)
        .map((test) => {
        if (!test.vars) {
            return;
        }
        return (0, dedent_1.default) `
          <Test>
          ${JSON.stringify(test.vars, null, 2)}
          </Test>`;
    })
        .filter(Boolean)
        .sort()
        .join('\n')}
  `;
    return (0, dedent_1.default) `
    Consider ${prompts.length > 1 ? 'these prompts' : 'this prompt'}, which contains some {{variables}}:
  ${promptsString}

  This is your persona:
  <Persona>
  ${persona}
  </Persona>

  ${existingTests}

  Fully embody this persona and determine a value for each variable, such that the prompt would be sent by this persona.

  You are a tester, so try to think of ${numTestCasesPerPersona} sets of values that would be interesting or unusual to test.${instructions ? ` ${instructions}` : ''}

  Your response should contain a JSON map of variable names to values, of the form {vars: {${Array.from(variables)
        .map((varName) => `${varName}: string`)
        .join(', ')}}[]}`;
}
async function synthesize({ prompts, instructions, tests, numPersonas, numTestCasesPerPersona, provider, }) {
    if (prompts.length < 1) {
        throw new Error('Dataset synthesis requires at least one prompt.');
    }
    numPersonas = numPersonas || 5;
    numTestCasesPerPersona = numTestCasesPerPersona || 3;
    let progressBar;
    if (logger_1.default.level !== 'debug') {
        const cliProgress = await Promise.resolve().then(() => __importStar(require('cli-progress')));
        progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        const totalProgressSteps = 1 + numPersonas * numTestCasesPerPersona;
        progressBar.start(totalProgressSteps, 0);
    }
    logger_1.default.debug(`Starting dataset synthesis. We'll begin by generating up to ${numPersonas} personas. Each persona will be used to generate ${numTestCasesPerPersona} test cases.`);
    logger_1.default.debug(`Generating user personas from ${prompts.length} prompt${prompts.length > 1 ? 's' : ''}...`);
    let providerModel;
    if (typeof provider === 'undefined') {
        providerModel = (await (0, defaults_1.getDefaultProviders)()).synthesizeProvider;
    }
    else {
        providerModel = await (0, providers_1.loadApiProvider)(provider);
    }
    const personasPrompt = generatePersonasPrompt(prompts, numPersonas);
    logger_1.default.debug(`Generated personas prompt:\n${personasPrompt}`);
    const resp = await providerModel.callApi(personasPrompt);
    logger_1.default.debug(`Received personas response:\n${resp.output}`);
    (0, invariant_1.default)(typeof resp.output !== 'undefined', 'resp.output must be defined');
    const output = typeof resp.output === 'string' ? resp.output : JSON.stringify(resp.output);
    const respObjects = (0, json_1.extractJsonObjects)(output);
    (0, invariant_1.default)(respObjects.length >= 1, `Expected at least one JSON object in the response for personas, got ${respObjects.length}`);
    const personas = respObjects[0].personas;
    logger_1.default.debug(`Generated ${personas.length} persona${personas.length === 1 ? '' : 's'}:\n${personas.map((p) => `  - ${p}`).join('\n')}`);
    if (progressBar) {
        progressBar.increment();
    }
    // Extract variable names from the nunjucks template in the prompts
    const variables = (0, templates_1.extractVariablesFromTemplates)(prompts);
    logger_1.default.debug(`Extracted ${variables.length} variable${variables.length === 1 ? '' : 's'} from prompt${prompts.length === 1 ? '' : 's'}:\n${variables
        .map((v) => `  - ${v}`)
        .join('\n')}`);
    const batchSize = 20;
    const totalTestCases = numPersonas * numTestCasesPerPersona;
    const generateTestCasesForPersona = async (currentTestCases) => {
        const remainingCount = totalTestCases - currentTestCases.length;
        const currentBatchSize = Math.min(remainingCount, batchSize);
        const persona = personas[currentTestCases.length % personas.length];
        logger_1.default.debug(`Generating ${currentBatchSize} test cases for persona ${(currentTestCases.length % personas.length) + 1} of ${personas.length}...`);
        const personaPrompt = testCasesPrompt(prompts, persona, tests, currentBatchSize, variables, instructions);
        logger_1.default.debug(`Generated persona prompt:\n${personaPrompt}`);
        const personaResponse = await providerModel.callApi(personaPrompt);
        logger_1.default.debug(`Received persona response:\n${personaResponse.output}`);
        const personaResponseObjects = (0, json_1.extractJsonObjects)(personaResponse.output);
        (0, invariant_1.default)(personaResponseObjects.length >= 1, `Expected at least one JSON object in the response for persona ${persona}, got ${personaResponseObjects.length}`);
        const parsed = personaResponseObjects[0];
        logger_1.default.debug(`Received ${parsed.vars?.length} test cases`);
        if (progressBar) {
            progressBar.increment(parsed.vars?.length);
        }
        return parsed.vars || [];
    };
    let testCaseVars = await (0, generation_1.retryWithDeduplication)(generateTestCasesForPersona, totalTestCases);
    logger_1.default.debug(`Generated ${testCaseVars.length} test cases`);
    if (testCaseVars.length > totalTestCases) {
        logger_1.default.debug(`Generated ${testCaseVars.length} test cases, but only ${totalTestCases} were requested. Sampling down to ${totalTestCases}...`);
        testCaseVars = (0, generation_1.sampleArray)(testCaseVars, totalTestCases);
    }
    if (progressBar) {
        progressBar.stop();
    }
    return testCaseVars;
}
async function synthesizeFromTestSuite(testSuite, options) {
    return synthesize({
        ...options,
        prompts: testSuite.prompts.map((prompt) => prompt.raw),
        tests: testSuite.tests || [],
    });
}
//# sourceMappingURL=synthesis.js.map