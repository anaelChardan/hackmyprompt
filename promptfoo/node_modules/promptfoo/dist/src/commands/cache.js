"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheCommand = cacheCommand;
const cache_1 = require("../cache");
const logger_1 = __importDefault(require("../logger"));
const telemetry_1 = __importDefault(require("../telemetry"));
const util_1 = require("../util");
function cacheCommand(program) {
    program
        .command('cache')
        .description('Manage cache')
        .command('clear')
        .description('Clear cache')
        .option('--env-file, --env-path <path>', 'Path to .env file')
        .action(async (cmdObj) => {
        (0, util_1.setupEnv)(cmdObj.envPath);
        logger_1.default.info('Clearing cache...');
        const cuteMessages = [
            'Scrubbing bits...',
            'Sweeping stale data...',
            'Defragmenting memory...',
            'Flushing temporary files...',
            'Tuning hyperparameters...',
            'Purging expired entries...',
            'Resetting cache counters...',
            'Pruning the neural net...',
            'Removing overfitting...',
            'Invalidating cached queries...',
            'Aligning embeddings...',
            'Refreshing data structures...',
        ];
        let messageIndex = 0;
        const interval = setInterval(() => {
            logger_1.default.info(cuteMessages[messageIndex % cuteMessages.length]);
            messageIndex++;
        }, 8000);
        try {
            await (0, cache_1.clearCache)();
        }
        finally {
            clearInterval(interval);
        }
        telemetry_1.default.record('command_used', {
            name: 'cache_clear',
        });
        await telemetry_1.default.send();
    });
}
//# sourceMappingURL=cache.js.map