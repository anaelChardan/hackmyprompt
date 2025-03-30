"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContextRelevance = void 0;
const matchers_1 = require("../matchers");
const invariant_1 = __importDefault(require("../util/invariant"));
const handleContextRelevance = async ({ assertion, test, }) => {
    (0, invariant_1.default)(test.vars, 'context-relevance assertion type must have a vars object');
    (0, invariant_1.default)(typeof test.vars.query === 'string', 'context-relevance assertion type must have a query var');
    (0, invariant_1.default)(typeof test.vars.context === 'string', 'context-relevance assertion type must have a context var');
    return {
        assertion,
        ...(await (0, matchers_1.matchesContextRelevance)(test.vars.query, test.vars.context, assertion.threshold ?? 0, test.options)),
    };
};
exports.handleContextRelevance = handleContextRelevance;
//# sourceMappingURL=contextRelevance.js.map