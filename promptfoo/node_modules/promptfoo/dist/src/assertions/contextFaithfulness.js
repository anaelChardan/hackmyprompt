"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContextFaithfulness = handleContextFaithfulness;
const matchers_1 = require("../matchers");
const invariant_1 = __importDefault(require("../util/invariant"));
async function handleContextFaithfulness({ assertion, test, output, }) {
    (0, invariant_1.default)(test.vars, 'context-faithfulness assertion type must have a vars object');
    (0, invariant_1.default)(typeof test.vars.query === 'string', 'context-faithfulness assertion type must have a query var');
    (0, invariant_1.default)(typeof test.vars.context === 'string', 'context-faithfulness assertion type must have a context var');
    (0, invariant_1.default)(typeof output === 'string', 'context-faithfulness assertion type must have a string output');
    return {
        assertion,
        ...(await (0, matchers_1.matchesContextFaithfulness)(test.vars.query, output, test.vars.context, assertion.threshold ?? 0, test.options)),
    };
}
//# sourceMappingURL=contextFaithfulness.js.map