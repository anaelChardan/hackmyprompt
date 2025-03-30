"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRedteam = void 0;
const graders_1 = require("../redteam/graders");
const invariant_1 = __importDefault(require("../util/invariant"));
const handleRedteam = async ({ assertion, baseType, test, prompt, outputString, provider, renderedValue, }) => {
    const grader = (0, graders_1.getGraderById)(assertion.type);
    (0, invariant_1.default)(grader, `Unknown grader: ${baseType}`);
    (0, invariant_1.default)(prompt, `Grader ${baseType} must have a prompt`);
    const { grade, rubric, suggestions } = await grader.getResult(prompt, outputString, test, provider, renderedValue);
    return {
        assertion: {
            ...assertion,
            value: rubric,
        },
        ...grade,
        suggestions,
        metadata: {
            // Pass through all test metadata for redteam
            ...test.metadata,
            ...grade.metadata,
        },
    };
};
exports.handleRedteam = handleRedteam;
//# sourceMappingURL=redteam.js.map