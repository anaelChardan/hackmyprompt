"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommand = deleteCommand;
const confirm_1 = __importDefault(require("@inquirer/confirm"));
const logger_1 = __importDefault(require("../logger"));
const telemetry_1 = __importDefault(require("../telemetry"));
const util_1 = require("../util");
const database_1 = require("../util/database");
async function handleEvalDelete(evalId, envPath) {
    try {
        await (0, database_1.deleteEval)(evalId);
        logger_1.default.info(`Evaluation with ID ${evalId} has been successfully deleted.`);
    }
    catch (error) {
        logger_1.default.error(`Could not delete evaluation with ID ${evalId}:\n${error}`);
        process.exit(1);
    }
}
async function handleEvalDeleteAll() {
    const confirmed = await (0, confirm_1.default)({
        message: 'Are you sure you want to delete all stored evaluations? This action cannot be undone.',
    });
    if (!confirmed) {
        return;
    }
    await (0, database_1.deleteAllEvals)();
    logger_1.default.info('All evaluations have been deleted.');
}
function deleteCommand(program) {
    const deleteCommand = program
        .command('delete <id>')
        .description('Delete various resources')
        .option('--env-file, --env-path <path>', 'Path to .env file')
        .action(async (id, cmdObj) => {
        (0, util_1.setupEnv)(cmdObj.envPath);
        telemetry_1.default.record('command_used', {
            name: 'delete',
        });
        const evl = await (0, database_1.getEvalFromId)(id);
        if (evl) {
            return handleEvalDelete(id, cmdObj.envPath);
        }
        logger_1.default.error(`No resource found with ID ${id}`);
    });
    deleteCommand
        .command('eval <id>')
        .description('Delete an evaluation by ID. Use "latest" to delete the most recent evaluation, or "all" to delete all evaluations.')
        .option('--env-file, --env-path <path>', 'Path to .env file')
        .action(async (evalId, cmdObj) => {
        (0, util_1.setupEnv)(cmdObj.envPath);
        telemetry_1.default.record('command_used', {
            name: 'delete eval',
            evalId,
        });
        await telemetry_1.default.send();
        if (evalId === 'latest') {
            const latestResults = await (0, database_1.getLatestEval)();
            if (latestResults) {
                await handleEvalDelete(latestResults.createdAt, cmdObj.envPath);
            }
            else {
                logger_1.default.error('No eval found.');
                process.exitCode = 1;
            }
        }
        else if (evalId === 'all') {
            await handleEvalDeleteAll();
        }
        else {
            await handleEvalDelete(evalId, cmdObj.envPath);
        }
    });
}
//# sourceMappingURL=delete.js.map