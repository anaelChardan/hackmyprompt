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
exports.handleRougeScore = handleRougeScore;
const rouge = __importStar(require("js-rouge"));
const invariant_1 = __importDefault(require("../util/invariant"));
function handleRougeScore({ baseType, assertion, renderedValue, outputString, inverse, }) {
    (0, invariant_1.default)(typeof renderedValue === 'string', '"rouge" assertion type must be a string value');
    const fnName = baseType[baseType.length - 1];
    const rougeMethod = rouge[fnName];
    const score = rougeMethod(outputString, renderedValue, {});
    const threshold = assertion.threshold ?? 0.75;
    const pass = score >= threshold != inverse;
    return {
        pass,
        score: inverse ? 1 - score : score,
        reason: pass
            ? `${baseType.toUpperCase()} score ${score.toFixed(2)} is greater than or equal to threshold ${threshold}`
            : `${baseType.toUpperCase()} score ${score.toFixed(2)} is less than threshold ${threshold}`,
        assertion,
    };
}
//# sourceMappingURL=rouge.js.map