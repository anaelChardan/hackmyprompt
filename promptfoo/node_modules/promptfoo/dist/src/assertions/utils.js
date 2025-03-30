"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinalTest = getFinalTest;
exports.loadFromJavaScriptFile = loadFromJavaScriptFile;
exports.processFileReference = processFileReference;
exports.coerceString = coerceString;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const rfdc_1 = __importDefault(require("rfdc"));
const cliState_1 = __importDefault(require("../cliState"));
const esm_1 = require("../esm");
const clone = (0, rfdc_1.default)();
function getFinalTest(test, assertion) {
    // Deep copy
    const ret = clone({
        ...test,
        ...(test.options &&
            test.options.provider && {
            options: {
                ...test.options,
                provider: undefined,
            },
        }),
        ...(test.provider && {
            provider: undefined,
        }),
    });
    // Assertion provider overrides test provider
    ret.options = ret.options || {};
    // NOTE: Clone does not copy functions so we set the provider again
    if (test.provider) {
        ret.provider = test.provider;
    }
    ret.options.provider = assertion.provider || test?.options?.provider;
    ret.options.rubricPrompt = assertion.rubricPrompt || ret.options.rubricPrompt;
    return Object.freeze(ret);
}
async function loadFromJavaScriptFile(filePath, functionName, args) {
    const requiredModule = await (0, esm_1.importModule)(filePath, functionName);
    if (functionName && typeof requiredModule[functionName] === 'function') {
        return requiredModule[functionName](...args);
    }
    else if (typeof requiredModule === 'function') {
        return requiredModule(...args);
    }
    else if (requiredModule.default && typeof requiredModule.default === 'function') {
        return requiredModule.default(...args);
    }
    else {
        throw new Error(`Assertion malformed: ${filePath} must export a function or have a default export as a function`);
    }
}
function processFileReference(fileRef) {
    const basePath = cliState_1.default.basePath || '';
    const filePath = path_1.default.resolve(basePath, fileRef.slice('file://'.length));
    const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
    const extension = path_1.default.extname(filePath);
    if (['.json', '.yaml', '.yml'].includes(extension)) {
        return js_yaml_1.default.load(fileContent);
    }
    else if (extension === '.txt') {
        return fileContent.trim();
    }
    else {
        throw new Error(`Unsupported file type: ${filePath}`);
    }
}
function coerceString(value) {
    if (typeof value === 'string') {
        return value;
    }
    return JSON.stringify(value);
}
//# sourceMappingURL=utils.js.map