"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestVersion = getLatestVersion;
exports.checkForUpdates = checkForUpdates;
const chalk_1 = __importDefault(require("chalk"));
const gt_1 = __importDefault(require("semver/functions/gt"));
const constants_1 = require("./constants");
const envars_1 = require("./envars");
const fetch_1 = require("./fetch");
const logger_1 = __importDefault(require("./logger"));
async function getLatestVersion() {
    const response = await (0, fetch_1.fetchWithTimeout)(`https://api.promptfoo.dev/api/latestVersion`, {}, 1000);
    if (!response.ok) {
        throw new Error(`Failed to fetch package information for promptfoo`);
    }
    const data = (await response.json());
    return data.latestVersion;
}
async function checkForUpdates() {
    if ((0, envars_1.getEnvBool)('PROMPTFOO_DISABLE_UPDATE')) {
        return false;
    }
    let latestVersion;
    try {
        latestVersion = await getLatestVersion();
    }
    catch {
        return false;
    }
    if ((0, gt_1.default)(latestVersion, constants_1.VERSION)) {
        const border = '='.repeat(constants_1.TERMINAL_MAX_WIDTH);
        logger_1.default.info(`\n${border}
${chalk_1.default.yellow('⚠️')} The current version of promptfoo ${chalk_1.default.yellow(constants_1.VERSION)} is lower than the latest available version ${chalk_1.default.green(latestVersion)}.

Please run ${chalk_1.default.green('npx promptfoo@latest')} or ${chalk_1.default.green('npm install -g promptfoo@latest')} to update.
${border}\n`);
        return true;
    }
    return false;
}
//# sourceMappingURL=updates.js.map