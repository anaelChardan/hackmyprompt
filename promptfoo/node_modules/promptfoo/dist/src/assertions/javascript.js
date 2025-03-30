"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJavascript = void 0;
const types_1 = require("../types");
const invariant_1 = __importDefault(require("../util/invariant"));
const validateResult = async (result) => {
    result = await Promise.resolve(result);
    if (typeof result === 'boolean' || typeof result === 'number' || (0, types_1.isGradingResult)(result)) {
        return result;
    }
    else {
        throw new Error(`Custom function must return a boolean, number, or GradingResult object. Got type ${typeof result}: ${JSON.stringify(result)}`);
    }
};
const handleJavascript = async ({ assertion, renderedValue, valueFromScript, context, outputString, output, inverse, }) => {
    let pass;
    let score;
    try {
        if (typeof assertion.value === 'function') {
            let ret = assertion.value(outputString, context);
            ret = await validateResult(ret);
            if (!ret.assertion) {
                // Populate the assertion object if the custom function didn't return it.
                const functionString = assertion.value.toString();
                ret.assertion = {
                    type: 'javascript',
                    value: functionString.length > 50 ? functionString.slice(0, 50) + '...' : functionString,
                };
            }
            return ret;
        }
        (0, invariant_1.default)(typeof renderedValue === 'string', 'javascript assertion must have a string value');
        /**
         * Removes trailing newline from the rendered value.
         * This is necessary for handling multi-line string literals in YAML
         * that are defined on a single line in the YAML file.
         *
         * @example
         * value: |
         *   output === 'true'
         */
        renderedValue = renderedValue.trimEnd();
        let result;
        if (typeof valueFromScript === 'undefined') {
            const functionBody = renderedValue.includes('\n') ? renderedValue : `return ${renderedValue}`;
            const customFunction = new Function('output', 'context', functionBody);
            result = await validateResult(customFunction(output, context));
        }
        else {
            (0, invariant_1.default)(typeof valueFromScript === 'boolean' ||
                typeof valueFromScript === 'number' ||
                typeof valueFromScript === 'object', `Javascript assertion script must return a boolean, number, or object (${assertion.value})`);
            result = await validateResult(valueFromScript);
        }
        if (typeof result === 'boolean') {
            pass = result !== inverse;
            score = pass ? 1 : 0;
        }
        else if (typeof result === 'number') {
            pass = assertion.threshold ? result >= assertion.threshold : result > 0;
            score = result;
        }
        else if (typeof result === 'object') {
            return result;
        }
        else {
            throw new Error('Custom function must return a boolean or number');
        }
    }
    catch (err) {
        return {
            pass: false,
            score: 0,
            reason: `Custom function threw error: ${err.message}
Stack Trace: ${err.stack}
${renderedValue}`,
            assertion,
        };
    }
    return {
        pass,
        score,
        reason: pass
            ? 'Assertion passed'
            : `Custom function returned ${inverse ? 'true' : 'false'}
${renderedValue}`,
        assertion,
    };
};
exports.handleJavascript = handleJavascript;
//# sourceMappingURL=javascript.js.map