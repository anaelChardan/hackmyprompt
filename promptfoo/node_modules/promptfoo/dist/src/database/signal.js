"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSignalFile = updateSignalFile;
exports.ensureSignalFile = ensureSignalFile;
exports.setupSignalWatcher = setupSignalWatcher;
const debounce_1 = __importDefault(require("debounce"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../logger"));
const index_1 = require("./index");
/**
 * Updates the signal file with the current timestamp.
 * This is used to notify clients that there are new data available.
 */
function updateSignalFile() {
    const filePath = (0, index_1.getDbSignalPath)();
    try {
        const now = new Date();
        logger_1.default.debug(`Writing to signal file ${filePath}`);
        fs_1.default.writeFileSync(filePath, now.toISOString());
        logger_1.default.debug('Successfully wrote to signal file');
    }
    catch (err) {
        logger_1.default.warn(`Failed to write database signal file: ${err}`);
    }
}
/**
 * Ensures the signal file exists, creating it if necessary.
 */
function ensureSignalFile() {
    const filePath = (0, index_1.getDbSignalPath)();
    if (!fs_1.default.existsSync(filePath)) {
        logger_1.default.debug(`Creating signal file at ${filePath}`);
        fs_1.default.writeFileSync(filePath, new Date().toISOString());
    }
}
/**
 * Sets up a watcher on the signal file and calls the callback when it changes.
 * @param onChange - Callback function that is called when the signal file changes
 * @returns The watcher instance
 */
function setupSignalWatcher(onChange) {
    const filePath = (0, index_1.getDbSignalPath)();
    logger_1.default.debug(`Setting up file watcher on ${filePath}`);
    ensureSignalFile();
    try {
        const watcher = fs_1.default.watch(filePath);
        watcher.on('change', (0, debounce_1.default)(onChange, 250));
        watcher.on('error', (error) => {
            logger_1.default.warn(`File watcher error: ${error}`);
        });
        return watcher;
    }
    catch (error) {
        logger_1.default.warn(`Failed to set up file watcher: ${error}`);
        throw error;
    }
}
//# sourceMappingURL=signal.js.map