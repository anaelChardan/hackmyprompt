"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_FILE_EXTENSIONS = exports.PROMPT_DELIMITER = void 0;
const envars_1 = require("../envars");
exports.PROMPT_DELIMITER = (0, envars_1.getEnvString)('PROMPTFOO_PROMPT_SEPARATOR') || '---';
exports.VALID_FILE_EXTENSIONS = [
    '.cjs',
    '.cts',
    '.j2',
    '.js',
    '.json',
    '.jsonl',
    '.md',
    '.mjs',
    '.mts',
    '.py',
    '.ts',
    '.txt',
    '.yml',
    '.yaml',
];
//# sourceMappingURL=constants.js.map