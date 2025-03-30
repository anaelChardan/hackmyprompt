"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginsCommand = pluginsCommand;
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("../../logger"));
const constants_1 = require("../constants");
function pluginsCommand(program) {
    program
        .command('plugins')
        .description('List all available plugins')
        .option('--ids-only', 'Show only plugin IDs without descriptions')
        .option('--default', 'Show only the default plugins')
        .action(async (options) => {
        const pluginsToShow = options.default ? constants_1.DEFAULT_PLUGINS : constants_1.ALL_PLUGINS;
        if (options.idsOnly) {
            pluginsToShow.forEach((plugin) => {
                logger_1.default.info(plugin);
            });
        }
        else {
            pluginsToShow.forEach((plugin) => {
                const description = constants_1.subCategoryDescriptions[plugin] || 'No description available';
                logger_1.default.info(`${chalk_1.default.blue.bold(plugin)}: ${description}`);
            });
        }
    });
}
//# sourceMappingURL=plugins.js.map