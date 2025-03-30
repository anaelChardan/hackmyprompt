"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTable = generateTable;
exports.wrapTable = wrapTable;
const chalk_1 = __importDefault(require("chalk"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const constants_1 = require("./constants");
const types_1 = require("./types");
const text_1 = require("./util/text");
function generateTable(evaluateTable, tableCellMaxLength = 250, maxRows = 25) {
    const head = evaluateTable.head;
    const headLength = head.prompts.length + head.vars.length;
    const table = new cli_table3_1.default({
        head: [
            ...head.vars,
            ...head.prompts.map((prompt) => `[${prompt.provider}] ${prompt.label}`),
        ].map((h) => (0, text_1.ellipsize)(h, tableCellMaxLength)),
        colWidths: Array(headLength).fill(Math.floor(constants_1.TERMINAL_MAX_WIDTH / headLength)),
        wordWrap: true,
        wrapOnWordBoundary: true, // if false, ansi colors break
        style: {
            head: ['blue', 'bold'],
        },
    });
    // Skip first row (header) and add the rest. Color PASS/FAIL
    for (const row of evaluateTable.body.slice(0, maxRows)) {
        table.push([
            ...row.vars.map((v) => (0, text_1.ellipsize)(v, tableCellMaxLength)),
            ...row.outputs.map(({ pass, score, text, failureReason: failureType }) => {
                text = (0, text_1.ellipsize)(text, tableCellMaxLength);
                if (pass) {
                    return chalk_1.default.green('[PASS] ') + text;
                }
                else if (!pass) {
                    // color everything red up until '---'
                    return (chalk_1.default.red(failureType === types_1.ResultFailureReason.ASSERT ? '[FAIL] ' : '[ERROR] ') +
                        text
                            .split('---')
                            .map((c, idx) => (idx === 0 ? chalk_1.default.red.bold(c) : c))
                            .join('---'));
                }
                return text;
            }),
        ]);
    }
    return table.toString();
}
function wrapTable(rows, columnWidths) {
    if (rows.length === 0) {
        return 'No data to display';
    }
    const head = Object.keys(rows[0]);
    // Calculate widths based on content and terminal width
    const defaultWidth = Math.floor(constants_1.TERMINAL_MAX_WIDTH / head.length);
    const colWidths = head.map((column) => columnWidths?.[column] || defaultWidth);
    const table = new cli_table3_1.default({
        head,
        colWidths,
        wordWrap: true,
        wrapOnWordBoundary: true,
    });
    for (const row of rows) {
        table.push(Object.values(row));
    }
    return table;
}
//# sourceMappingURL=table.js.map