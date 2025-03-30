"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIContainsAll = exports.handleContainsAll = exports.handleIContainsAny = exports.handleContainsAny = exports.handleIContains = exports.handleContains = void 0;
const invariant_1 = __importDefault(require("../util/invariant"));
const handleContains = ({ assertion, renderedValue, valueFromScript, outputString, inverse, }) => {
    const value = valueFromScript ?? renderedValue;
    (0, invariant_1.default)(value, '"contains" assertion type must have a string or number value');
    (0, invariant_1.default)(typeof value === 'string' || typeof value === 'number', '"contains" assertion type must have a string or number value');
    const pass = outputString.includes(String(value)) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}contain "${value}"`,
        assertion,
    };
};
exports.handleContains = handleContains;
const handleIContains = ({ assertion, renderedValue, valueFromScript, outputString, inverse, }) => {
    const value = valueFromScript ?? renderedValue;
    (0, invariant_1.default)(value, '"icontains" assertion type must have a string or number value');
    (0, invariant_1.default)(typeof value === 'string' || typeof value === 'number', '"icontains" assertion type must have a string or number value');
    const pass = outputString.toLowerCase().includes(String(value).toLowerCase()) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}contain "${value}"`,
        assertion,
    };
};
exports.handleIContains = handleIContains;
const handleContainsAny = ({ assertion, renderedValue, valueFromScript, outputString, inverse, }) => {
    let value = valueFromScript ?? renderedValue;
    (0, invariant_1.default)(value, '"contains-any" assertion type must have a value');
    if (typeof value === 'string') {
        // Handle quoted values and escaped commas
        value =
            value.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)?.map((v) => v.trim().replace(/^"|"$/g, '')) ?? [];
    }
    (0, invariant_1.default)(Array.isArray(value), '"contains-any" assertion type must have an array value');
    const pass = value.some((v) => outputString.includes(String(v))) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}contain one of "${value.join(', ')}"`,
        assertion,
    };
};
exports.handleContainsAny = handleContainsAny;
const handleIContainsAny = ({ assertion, renderedValue, valueFromScript, outputString, inverse, }) => {
    let value = valueFromScript ?? renderedValue;
    (0, invariant_1.default)(value, '"icontains-any" assertion type must have a value');
    if (typeof value === 'string') {
        value = value.split(',').map((v) => v.trim());
    }
    (0, invariant_1.default)(Array.isArray(value), '"icontains-any" assertion type must have an array value');
    const pass = value.some((v) => outputString.toLowerCase().includes(String(v).toLowerCase())) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}contain one of "${value.join(', ')}"`,
        assertion,
    };
};
exports.handleIContainsAny = handleIContainsAny;
const handleContainsAll = ({ assertion, renderedValue, valueFromScript, outputString, inverse, }) => {
    let value = valueFromScript ?? renderedValue;
    (0, invariant_1.default)(value, '"contains-all" assertion type must have a value');
    if (typeof value === 'string') {
        value = value.split(',').map((v) => v.trim());
    }
    (0, invariant_1.default)(Array.isArray(value), '"contains-all" assertion type must have an array value');
    const missingStrings = value.filter((v) => !outputString.includes(String(v)));
    const pass = (missingStrings.length === 0) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}contain all of [${value.join(', ')}]. Missing: [${missingStrings.join(', ')}]`,
        assertion,
    };
};
exports.handleContainsAll = handleContainsAll;
const handleIContainsAll = ({ assertion, renderedValue, valueFromScript, outputString, inverse, }) => {
    let value = valueFromScript ?? renderedValue;
    (0, invariant_1.default)(value, '"icontains-all" assertion type must have a value');
    if (typeof value === 'string') {
        value = value.split(',').map((v) => v.trim());
    }
    (0, invariant_1.default)(Array.isArray(value), '"icontains-all" assertion type must have an array value');
    const missingStrings = value.filter((v) => !outputString.toLowerCase().includes(String(v).toLowerCase()));
    const pass = (missingStrings.length === 0) !== inverse;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Expected output to ${inverse ? 'not ' : ''}contain all of [${value.join(', ')}]. Missing: [${missingStrings.join(', ')}]`,
        assertion,
    };
};
exports.handleIContainsAll = handleIContainsAll;
//# sourceMappingURL=contains.js.map