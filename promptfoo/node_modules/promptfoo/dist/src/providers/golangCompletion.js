"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GolangProvider = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const cache_1 = require("../cache");
const logger_1 = __importDefault(require("../logger"));
const util_2 = require("../util");
const createHash_1 = require("../util/createHash");
const json_1 = require("../util/json");
const execAsync = util_1.default.promisify(child_process_1.exec);
class GolangProvider {
    constructor(runPath, options) {
        this.options = options;
        const { filePath: providerPath, functionName } = (0, util_2.parsePathOrGlob)(options?.config.basePath || '', runPath);
        this.scriptPath = path_1.default.relative(options?.config.basePath || '', providerPath);
        this.functionName = functionName || null;
        this.id = () => options?.id ?? `golang:${this.scriptPath}:${this.functionName || 'default'}`;
        this.label = options?.label;
        this.config = options?.config ?? {};
    }
    id() {
        return `golang:${this.scriptPath}:${this.functionName || 'default'}`;
    }
    findModuleRoot(startPath) {
        let currentPath = startPath;
        while (currentPath !== path_1.default.dirname(currentPath)) {
            if (fs_1.default.existsSync(path_1.default.join(currentPath, 'go.mod'))) {
                return currentPath;
            }
            currentPath = path_1.default.dirname(currentPath);
        }
        throw new Error('Could not find go.mod file in any parent directory');
    }
    async executeGolangScript(prompt, context, apiType) {
        const absPath = path_1.default.resolve(path_1.default.join(this.options?.config.basePath || '', this.scriptPath));
        const moduleRoot = this.findModuleRoot(path_1.default.dirname(absPath));
        logger_1.default.debug(`Found module root at ${moduleRoot}`);
        logger_1.default.debug(`Computing file hash for script ${absPath}`);
        const fileHash = (0, createHash_1.sha256)(fs_1.default.readFileSync(absPath, 'utf-8'));
        const cacheKey = `golang:${this.scriptPath}:${apiType}:${fileHash}:${prompt}:${JSON.stringify(this.options)}:${JSON.stringify(context?.vars)}`;
        const cache = await (0, cache_1.getCache)();
        let cachedResult;
        if ((0, cache_1.isCacheEnabled)()) {
            cachedResult = (await cache.get(cacheKey));
        }
        if (cachedResult) {
            logger_1.default.debug(`Returning cached ${apiType} result for script ${absPath}`);
            return JSON.parse(cachedResult);
        }
        else {
            if (context) {
                // These are not useful in Golang
                delete context.fetchWithCache;
                delete context.getCache;
                delete context.logger;
            }
            const args = apiType === 'call_api' ? [prompt, this.options, context] : [prompt, this.options];
            logger_1.default.debug(`Running Golang script ${absPath} with scriptPath ${this.scriptPath} and args: ${(0, json_1.safeJsonStringify)(args)}`);
            const functionName = this.functionName || apiType;
            let tempDir;
            try {
                // Create temp directory
                tempDir = fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), 'golang-provider-'));
                // Helper function to copy directory recursively
                const copyDir = (src, dest) => {
                    fs_1.default.mkdirSync(dest, { recursive: true });
                    const entries = fs_1.default.readdirSync(src, { withFileTypes: true });
                    for (const entry of entries) {
                        const srcPath = path_1.default.join(src, entry.name);
                        const destPath = path_1.default.join(dest, entry.name);
                        if (entry.isDirectory()) {
                            copyDir(srcPath, destPath);
                        }
                        else {
                            fs_1.default.copyFileSync(srcPath, destPath);
                        }
                    }
                };
                // Copy the entire module structure
                copyDir(moduleRoot, tempDir);
                const relativeScriptPath = path_1.default.relative(moduleRoot, absPath);
                const scriptDir = path_1.default.dirname(path_1.default.join(tempDir, relativeScriptPath));
                // Copy wrapper.go to the same directory as the script
                const tempWrapperPath = path_1.default.join(scriptDir, 'wrapper.go');
                fs_1.default.mkdirSync(scriptDir, { recursive: true });
                fs_1.default.copyFileSync(path_1.default.join(__dirname, '../golang/wrapper.go'), tempWrapperPath);
                const executablePath = path_1.default.join(tempDir, 'golang_wrapper');
                const tempScriptPath = path_1.default.join(tempDir, relativeScriptPath);
                // Build from the script directory
                const compileCommand = `cd ${scriptDir} && ${this.config.goExecutable || 'go'} build -o ${executablePath} wrapper.go ${path_1.default.basename(relativeScriptPath)}`;
                await execAsync(compileCommand);
                const jsonArgs = (0, json_1.safeJsonStringify)(args) || '[]';
                // Escape single quotes in the JSON string
                const escapedJsonArgs = jsonArgs.replace(/'/g, "'\\''");
                const command = `${executablePath} ${tempScriptPath} ${functionName} '${escapedJsonArgs}'`;
                logger_1.default.debug(`Running command: ${command}`);
                const { stdout, stderr } = await execAsync(command);
                if (stderr) {
                    logger_1.default.error(`Golang script stderr: ${stderr}`);
                }
                logger_1.default.debug(`Golang script stdout: ${stdout}`);
                const result = JSON.parse(stdout);
                if ((0, cache_1.isCacheEnabled)() && !('error' in result)) {
                    await cache.set(cacheKey, JSON.stringify(result));
                }
                return result;
            }
            catch (error) {
                logger_1.default.error(`Error running Golang script: ${error.message}`);
                logger_1.default.error(`Full error object: ${JSON.stringify(error)}`);
                throw new Error(`Error running Golang script: ${error.message}`);
            }
            finally {
                // Clean up temporary directory
                if (tempDir) {
                    fs_1.default.rmSync(tempDir, { recursive: true, force: true });
                }
            }
        }
    }
    async callApi(prompt, context) {
        return this.executeGolangScript(prompt, context, 'call_api');
    }
    async callEmbeddingApi(prompt) {
        return this.executeGolangScript(prompt, undefined, 'call_embedding_api');
    }
    async callClassificationApi(prompt) {
        return this.executeGolangScript(prompt, undefined, 'call_classification_api');
    }
}
exports.GolangProvider = GolangProvider;
//# sourceMappingURL=golangCompletion.js.map