"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNodeVersion = void 0;
const chalk_1 = __importDefault(require("chalk"));
const package_json_1 = require("../package.json");
const logger_1 = __importDefault(require("./logger"));
/**
 * Function to check the current Node version against the required version
 * Logs a warning and exits the process if the current Node version is not supported
 */
const checkNodeVersion = () => {
    const requiredVersion = package_json_1.engines.node;
    const versionMatch = process.version.match(/^v(\d+)\.(\d+)\.(\d+)/);
    if (!versionMatch) {
        logger_1.default.warn(chalk_1.default.yellow(`Unexpected Node.js version format: ${process.version}. Please use Node.js ${requiredVersion}.`));
        return;
    }
    const [major, minor, patch] = versionMatch.slice(1).map(Number);
    const [requiredMajor, requiredMinor, requiredPatch] = requiredVersion
        .replace('>=', '')
        .split('.')
        .map(Number);
    if (major < requiredMajor ||
        (major === requiredMajor && minor < requiredMinor) ||
        (major === requiredMajor && minor === requiredMinor && patch < requiredPatch)) {
        process.exitCode = 1;
        throw new Error(chalk_1.default.yellow(`You are using Node.js ${major}.${minor}.${patch}. This version is not supported. Please use Node.js ${requiredVersion}.`));
    }
};
exports.checkNodeVersion = checkNodeVersion;
//# sourceMappingURL=checkNodeVersion.js.map