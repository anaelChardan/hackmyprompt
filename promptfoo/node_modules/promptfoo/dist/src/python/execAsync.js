"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execAsync = void 0;
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
/**
 * Promisified version of Node.js `exec` function.
 *
 * This wrapper was created to work around a Jest mocking limitation
 * where directly mocking `util.promisify(exec)` was not being respected
 * in tests.
 */
exports.execAsync = util_1.default.promisify(child_process_1.exec);
//# sourceMappingURL=execAsync.js.map