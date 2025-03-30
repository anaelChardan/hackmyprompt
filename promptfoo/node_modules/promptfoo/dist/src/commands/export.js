"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCommand = exportCommand;
const logger_1 = __importDefault(require("../logger"));
const eval_1 = __importDefault(require("../models/eval"));
const telemetry_1 = __importDefault(require("../telemetry"));
const util_1 = require("../util");
function exportCommand(program) {
    program
        .command('export <evalId>')
        .description('Export an eval record to a JSON file')
        .option('-o, --output [outputPath]', 'Output path for the exported file')
        .action(async (evalId, cmdObj) => {
        try {
            let result;
            if (evalId === 'latest') {
                result = await eval_1.default.latest();
            }
            else {
                result = await eval_1.default.findById(evalId);
            }
            if (!result) {
                logger_1.default.error(`No eval found with ID ${evalId}`);
                process.exit(1);
            }
            const summary = await result.toEvaluateSummary();
            const jsonData = JSON.stringify(summary, null, 2);
            if (cmdObj.output) {
                await (0, util_1.writeOutput)(cmdObj.output, result, null);
                logger_1.default.info(`Eval with ID ${evalId} has been successfully exported to ${cmdObj.output}.`);
            }
            else {
                logger_1.default.info(jsonData);
            }
            telemetry_1.default.record('command_used', {
                name: 'export',
                evalId,
            });
            await telemetry_1.default.send();
        }
        catch (error) {
            logger_1.default.error(`Failed to export eval: ${error}`);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=export.js.map