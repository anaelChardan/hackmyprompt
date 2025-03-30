"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptCompletionProvider = void 0;
exports.parseScriptParts = parseScriptParts;
exports.getFileHashes = getFileHashes;
const child_process_1 = require("child_process");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const cache_1 = require("../cache");
const logger_1 = __importDefault(require("../logger"));
const invariant_1 = __importDefault(require("../util/invariant"));
const json_1 = require("../util/json");
const ANSI_ESCAPE = /\x1b(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g;
function stripText(text) {
    return text.replace(ANSI_ESCAPE, '');
}
function parseScriptParts(scriptPath) {
    const scriptPartsRegex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    let match;
    const scriptParts = [];
    while ((match = scriptPartsRegex.exec(scriptPath)) !== null) {
        if (match[1]) {
            scriptParts.push(match[1]);
        }
        else if (match[2]) {
            scriptParts.push(match[2]);
        }
        else {
            scriptParts.push(match[0]);
        }
    }
    return scriptParts;
}
function getFileHashes(scriptParts) {
    const fileHashes = [];
    for (const part of scriptParts) {
        const cleanPart = part.replace(/^['"]|['"]$/g, '');
        if (fs_1.default.existsSync(cleanPart) && fs_1.default.statSync(cleanPart).isFile()) {
            const fileContent = fs_1.default.readFileSync(cleanPart);
            const fileHash = crypto_1.default.createHash('sha256').update(fileContent).digest('hex');
            fileHashes.push(fileHash);
            logger_1.default.debug(`File hash for ${cleanPart}: ${fileHash}`);
        }
    }
    return fileHashes;
}
class ScriptCompletionProvider {
    constructor(scriptPath, options) {
        this.scriptPath = scriptPath;
        this.options = options;
    }
    id() {
        return `exec:${this.scriptPath}`;
    }
    async callApi(prompt, context) {
        const scriptParts = parseScriptParts(this.scriptPath);
        const fileHashes = getFileHashes(scriptParts);
        if (fileHashes.length === 0) {
            logger_1.default.warn(`Could not find any valid files in the command: ${this.scriptPath}`);
        }
        const cacheKey = `exec:${this.scriptPath}:${fileHashes.join(':')}:${prompt}:${JSON.stringify(this.options)}`;
        let cachedResult;
        if (fileHashes.length > 0 && (0, cache_1.isCacheEnabled)()) {
            const cache = await (0, cache_1.getCache)();
            cachedResult = await cache.get(cacheKey);
            if (cachedResult) {
                logger_1.default.debug(`Returning cached result for script ${this.scriptPath}: ${cachedResult}`);
                return JSON.parse(cachedResult);
            }
        }
        else if (fileHashes.length === 0 && (0, cache_1.isCacheEnabled)()) {
            logger_1.default.warn(`Could not hash any files for command ${this.scriptPath}, caching will not be used`);
        }
        return new Promise((resolve, reject) => {
            const command = scriptParts.shift();
            (0, invariant_1.default)(command, 'No command found in script path');
            // These are not useful in the shell
            delete context?.fetchWithCache;
            delete context?.getCache;
            delete context?.logger;
            const scriptArgs = scriptParts.concat([
                prompt,
                (0, json_1.safeJsonStringify)(this.options || {}),
                (0, json_1.safeJsonStringify)(context || {}),
            ]);
            const options = this.options?.config.basePath ? { cwd: this.options.config.basePath } : {};
            (0, child_process_1.execFile)(command, scriptArgs, options, async (error, stdout, stderr) => {
                if (error) {
                    logger_1.default.debug(`Error running script ${this.scriptPath}: ${error.message}`);
                    reject(error);
                    return;
                }
                const standardOutput = stripText(Buffer.from(stdout).toString('utf8').trim());
                const errorOutput = stripText(Buffer.from(stderr).toString('utf8').trim());
                if (errorOutput) {
                    logger_1.default.debug(`Error output from script ${this.scriptPath}: ${errorOutput}`);
                    if (!standardOutput) {
                        reject(new Error(errorOutput));
                        return;
                    }
                }
                logger_1.default.debug(`Output from script ${this.scriptPath}: ${standardOutput}`);
                const result = { output: standardOutput };
                if (fileHashes.length > 0 && (0, cache_1.isCacheEnabled)()) {
                    const cache = await (0, cache_1.getCache)();
                    await cache.set(cacheKey, JSON.stringify(result));
                }
                resolve(result);
            });
        });
    }
}
exports.ScriptCompletionProvider = ScriptCompletionProvider;
//# sourceMappingURL=scriptCompletion.js.map