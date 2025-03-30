"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPythonCode = runPythonCode;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../logger"));
const pythonUtils_1 = require("./pythonUtils");
/**
 * Executes Python code by writing it to a temporary file
 * @param {string} code - The Python code to execute.
 * @param {string} method - The method name to call in the Python script.
 * @param {(string | object | undefined)[]} args - The list of arguments to pass to the Python method.
 * @returns {Promise<any>} - The result from executing the Python code.
 */
async function runPythonCode(code, method, args) {
    const tempFilePath = path_1.default.join(os_1.default.tmpdir(), `temp-python-code-${Date.now()}-${Math.random().toString(16).slice(2)}.py`);
    try {
        fs_1.default.writeFileSync(tempFilePath, code);
        // Necessary to await so temp file doesn't get deleted.
        const result = await (0, pythonUtils_1.runPython)(tempFilePath, method, args);
        return result;
    }
    catch (error) {
        logger_1.default.error(`Error executing Python code: ${error}`);
        throw error;
    }
    finally {
        try {
            fs_1.default.unlinkSync(tempFilePath);
        }
        catch (error) {
            logger_1.default.error(`Error removing temporary file: ${error}`);
        }
    }
}
//# sourceMappingURL=wrapper.js.map