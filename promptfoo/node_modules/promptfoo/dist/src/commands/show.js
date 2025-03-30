"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCommand = showCommand;
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("../logger"));
const eval_1 = __importDefault(require("../models/eval"));
const table_1 = require("../table");
const telemetry_1 = __importDefault(require("../telemetry"));
const util_1 = require("../util");
const database_1 = require("../util/database");
const invariant_1 = __importDefault(require("../util/invariant"));
async function handlePrompt(id) {
    telemetry_1.default.record('command_used', {
        name: 'show prompt',
    });
    await telemetry_1.default.send();
    const prompt = await (0, database_1.getPromptFromHash)(id);
    if (!prompt) {
        logger_1.default.error(`Prompt with ID ${id} not found.`);
        return;
    }
    (0, util_1.printBorder)();
    logger_1.default.info(chalk_1.default.cyan(prompt.prompt.raw));
    (0, util_1.printBorder)();
    logger_1.default.info(chalk_1.default.bold(`Prompt ${id}`));
    (0, util_1.printBorder)();
    logger_1.default.info(`This prompt is used in the following evals:`);
    const table = [];
    for (const evl of prompt.evals.sort((a, b) => b.id.localeCompare(a.id)).slice(0, 10)) {
        table.push({
            'Eval ID': evl.id.slice(0, 6),
            'Dataset ID': evl.datasetId.slice(0, 6),
            'Raw score': evl.metrics?.score?.toFixed(2) || '-',
            'Pass rate': evl.metrics &&
                evl.metrics.testPassCount + evl.metrics.testFailCount + evl.metrics.testErrorCount > 0
                ? `${((evl.metrics.testPassCount /
                    (evl.metrics.testPassCount +
                        evl.metrics.testFailCount +
                        evl.metrics.testErrorCount)) *
                    100).toFixed(2)}%`
                : '-',
            'Pass count': evl.metrics?.testPassCount || '-',
            'Fail count': evl.metrics?.testFailCount ||
                '-' +
                    (evl.metrics?.testErrorCount && evl.metrics.testErrorCount > 0
                        ? `+ ${evl.metrics.testErrorCount} errors`
                        : ''),
        });
    }
    logger_1.default.info((0, table_1.wrapTable)(table));
    (0, util_1.printBorder)();
    logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show eval <id>')} to see details of a specific evaluation.`);
    logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show dataset <id>')} to see details of a specific dataset.`);
}
async function handleEval(id) {
    telemetry_1.default.record('command_used', {
        name: 'show eval',
    });
    await telemetry_1.default.send();
    const eval_ = await eval_1.default.findById(id);
    if (!eval_) {
        logger_1.default.error(`No evaluation found with ID ${id}`);
        return;
    }
    const table = await eval_.getTable();
    (0, invariant_1.default)(table, 'Could not generate table');
    const { prompts, vars } = table.head;
    logger_1.default.info((0, table_1.generateTable)(table, 100, 25));
    if (table.body.length > 25) {
        const rowsLeft = table.body.length - 25;
        logger_1.default.info(`... ${rowsLeft} more row${rowsLeft === 1 ? '' : 's'} not shown ...\n`);
    }
    (0, util_1.printBorder)();
    logger_1.default.info(chalk_1.default.cyan(`Eval ${id}`));
    (0, util_1.printBorder)();
    // TODO(ian): List prompt ids
    logger_1.default.info(`${prompts.length} prompts`);
    logger_1.default.info(`${vars.length} variables: ${vars.slice(0, 5).join(', ')}${vars.length > 5 ? ` (and ${vars.length - 5} more...)` : ''}`);
}
async function handleDataset(id) {
    telemetry_1.default.record('command_used', {
        name: 'show dataset',
    });
    await telemetry_1.default.send();
    const dataset = await (0, database_1.getDatasetFromHash)(id);
    if (!dataset) {
        logger_1.default.error(`Dataset with ID ${id} not found.`);
        return;
    }
    (0, util_1.printBorder)();
    logger_1.default.info(chalk_1.default.bold(`Dataset ${id}`));
    (0, util_1.printBorder)();
    logger_1.default.info(`This dataset is used in the following evals:`);
    const table = [];
    for (const prompt of dataset.prompts
        .sort((a, b) => b.evalId.localeCompare(a.evalId))
        .slice(0, 10)) {
        table.push({
            'Eval ID': prompt.evalId.slice(0, 6),
            'Prompt ID': prompt.id.slice(0, 6),
            'Raw score': prompt.prompt.metrics?.score?.toFixed(2) || '-',
            'Pass rate': prompt.prompt.metrics &&
                prompt.prompt.metrics.testPassCount +
                    prompt.prompt.metrics.testFailCount +
                    prompt.prompt.metrics.testErrorCount >
                    0
                ? `${((prompt.prompt.metrics.testPassCount /
                    (prompt.prompt.metrics.testPassCount +
                        prompt.prompt.metrics.testFailCount +
                        prompt.prompt.metrics.testErrorCount)) *
                    100).toFixed(2)}%`
                : '-',
            'Pass count': prompt.prompt.metrics?.testPassCount || '-',
            'Fail count': prompt.prompt.metrics?.testFailCount ||
                '-' +
                    (prompt.prompt.metrics?.testErrorCount && prompt.prompt.metrics.testErrorCount > 0
                        ? `+ ${prompt.prompt.metrics.testErrorCount} errors`
                        : ''),
        });
    }
    logger_1.default.info((0, table_1.wrapTable)(table));
    (0, util_1.printBorder)();
    logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show prompt <id>')} to see details of a specific prompt.`);
    logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show eval <id>')} to see details of a specific evaluation.`);
}
async function showCommand(program) {
    const showCommand = program
        .command('show [id]')
        .description('Show details of a specific resource (defaults to most recent)')
        .option('--env-file, --env-path <path>', 'Path to .env file')
        .action(async (id, cmdObj) => {
        (0, util_1.setupEnv)(cmdObj.envPath);
        telemetry_1.default.record('command_used', {
            name: 'show',
        });
        await telemetry_1.default.send();
        if (!id) {
            const latestEval = await eval_1.default.latest();
            if (latestEval) {
                return handleEval(latestEval.id);
            }
            logger_1.default.error('No eval found');
            process.exitCode = 1;
            return;
        }
        const evl = await (0, database_1.getEvalFromId)(id);
        if (evl) {
            return handleEval(id);
        }
        const prompt = await (0, database_1.getPromptFromHash)(id);
        if (prompt) {
            return handlePrompt(id);
        }
        const dataset = await (0, database_1.getDatasetFromHash)(id);
        if (dataset) {
            return handleDataset(id);
        }
        logger_1.default.error(`No resource found with ID ${id}`);
    });
    showCommand
        .command('eval [id]')
        .description('Show details of a specific evaluation (defaults to most recent)')
        .action(async (id) => {
        if (!id) {
            const latestEval = await eval_1.default.latest();
            if (latestEval) {
                return handleEval(latestEval.id);
            }
            logger_1.default.error('No eval found');
            process.exitCode = 1;
            return;
        }
        return handleEval(id);
    });
    showCommand
        .command('prompt <id>')
        .description('Show details of a specific prompt')
        .action(handlePrompt);
    showCommand
        .command('dataset <id>')
        .description('Show details of a specific dataset')
        .action(handleDataset);
}
//# sourceMappingURL=show.js.map