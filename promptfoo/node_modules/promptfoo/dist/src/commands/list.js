"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = listCommand;
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("../logger"));
const eval_1 = __importStar(require("../models/eval"));
const table_1 = require("../table");
const telemetry_1 = __importDefault(require("../telemetry"));
const util_1 = require("../util");
const createHash_1 = require("../util/createHash");
const database_1 = require("../util/database");
function listCommand(program) {
    const listCommand = program.command('list').description('List various resources');
    listCommand
        .command('evals')
        .description('List evaluations')
        .option('--env-file, --env-path <path>', 'Path to .env file')
        .option('-n <limit>', 'Number of evaluations to display')
        .option('--ids-only', 'Only show evaluation IDs')
        .action(async (cmdObj) => {
        (0, util_1.setupEnv)(cmdObj.envPath);
        telemetry_1.default.record('command_used', {
            name: 'list evals',
        });
        await telemetry_1.default.send();
        const evals = await eval_1.default.getMany(Number(cmdObj.n) || undefined);
        if (cmdObj.idsOnly) {
            evals.forEach((evl) => logger_1.default.info(evl.id));
            return;
        }
        const vars = await eval_1.EvalQueries.getVarsFromEvals(evals);
        const tableData = evals
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((evl) => {
            const prompts = evl.getPrompts();
            const description = evl.config.description || '';
            return {
                'eval id': evl.id,
                description: description.slice(0, 100) + (description.length > 100 ? '...' : ''),
                prompts: prompts.map((p) => (0, createHash_1.sha256)(p.raw).slice(0, 6)).join(', ') || '',
                vars: vars[evl.id]?.join(', ') || '',
            };
        });
        const columnWidths = {
            'eval id': 32,
            description: 25,
            prompts: 10,
            vars: 12,
        };
        logger_1.default.info((0, table_1.wrapTable)(tableData, columnWidths));
        (0, util_1.printBorder)();
        logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show eval <id>')} to see details of a specific evaluation.`);
        logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show prompt <id>')} to see details of a specific prompt.`);
    });
    listCommand
        .command('prompts')
        .description('List prompts')
        .option('--env-file, --env-path <path>', 'Path to .env file')
        .option('-n <limit>', 'Number of prompts to display')
        .option('--ids-only', 'Only show prompt IDs')
        .action(async (cmdObj) => {
        (0, util_1.setupEnv)(cmdObj.envPath);
        telemetry_1.default.record('command_used', {
            name: 'list prompts',
        });
        await telemetry_1.default.send();
        const prompts = (await (0, database_1.getPrompts)(Number(cmdObj.n) || undefined)).sort((a, b) => a.recentEvalId.localeCompare(b.recentEvalId));
        if (cmdObj.idsOnly) {
            prompts.forEach((prompt) => logger_1.default.info(prompt.id));
            return;
        }
        const tableData = prompts.map((prompt) => ({
            'prompt id': prompt.id.slice(0, 6),
            raw: prompt.prompt.raw.slice(0, 100) + (prompt.prompt.raw.length > 100 ? '...' : ''),
            evals: prompt.count,
            'recent eval': prompt.recentEvalId,
        }));
        const columnWidths = {
            'prompt id': 12,
            raw: 30,
            evals: 8,
            'recent eval': 30,
        };
        logger_1.default.info((0, table_1.wrapTable)(tableData, columnWidths));
        (0, util_1.printBorder)();
        logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show prompt <id>')} to see details of a specific prompt.`);
        logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show eval <id>')} to see details of a specific evaluation.`);
    });
    listCommand
        .command('datasets')
        .description('List datasets')
        .option('--env-file, --env-path <path>', 'Path to .env file')
        .option('-n <limit>', 'Number of datasets to display')
        .option('--ids-only', 'Only show dataset IDs')
        .action(async (cmdObj) => {
        (0, util_1.setupEnv)(cmdObj.envPath);
        telemetry_1.default.record('command_used', {
            name: 'list datasets',
        });
        await telemetry_1.default.send();
        const datasets = (await (0, database_1.getTestCases)(Number(cmdObj.n) || undefined)).sort((a, b) => b.recentEvalId.localeCompare(a.recentEvalId));
        if (cmdObj.idsOnly) {
            datasets.forEach((dataset) => logger_1.default.info(dataset.id));
            return;
        }
        const tableData = datasets.map((dataset) => ({
            'dataset id': dataset.id.slice(0, 6),
            'best prompt': dataset.prompts.length > 0
                ? dataset.prompts
                    .sort((a, b) => (b.prompt.metrics?.score || 0) - (a.prompt.metrics?.score || 0))[0]
                    ?.id.slice(0, 6) || 'N/A'
                : 'N/A',
            evals: dataset.count,
            prompts: dataset.prompts.length,
            'recent eval': dataset.recentEvalId,
        }));
        const columnWidths = {
            'dataset id': 12,
            'best prompt': 15,
            evals: 8,
            prompts: 10,
            'recent eval': 30,
        };
        logger_1.default.info((0, table_1.wrapTable)(tableData, columnWidths));
        (0, util_1.printBorder)();
        logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show dataset <id>')} to see details of a specific dataset.`);
        logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show prompt <id>')} to see details of a specific prompt.`);
        logger_1.default.info(`Run ${chalk_1.default.green('promptfoo show eval <id>')} to see details of a specific evaluation.`);
    });
}
//# sourceMappingURL=list.js.map