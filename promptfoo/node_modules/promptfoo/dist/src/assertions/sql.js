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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContainsSql = exports.handleIsSql = void 0;
const utils_1 = require("./utils");
const handleIsSql = async ({ assertion, renderedValue, outputString, inverse, }) => {
    let pass = false;
    let databaseType = 'MySQL';
    let whiteTableList;
    let whiteColumnList;
    if (renderedValue && typeof renderedValue === 'object') {
        const value = renderedValue;
        databaseType = value.databaseType || 'MySQL';
        whiteTableList = value.allowedTables;
        whiteColumnList = value.allowedColumns;
    }
    if (renderedValue && typeof renderedValue !== 'object') {
        throw new Error('is-sql assertion must have a object value.');
    }
    const { Parser: SqlParser } = await Promise.resolve().then(() => __importStar(require('node-sql-parser'))).catch(() => {
        throw new Error('node-sql-parser is not installed. Please install it first');
    });
    const sqlParser = new SqlParser();
    const opt = { database: databaseType };
    const failureReasons = [];
    try {
        sqlParser.astify(outputString, opt);
        pass = !inverse;
    }
    catch {
        pass = inverse;
        failureReasons.push(`SQL statement does not conform to the provided ${databaseType} database syntax.`);
    }
    if (whiteTableList) {
        opt.type = 'table';
        try {
            sqlParser.whiteListCheck(outputString, whiteTableList, opt);
        }
        catch (err) {
            pass = inverse;
            const error = err;
            failureReasons.push(`SQL validation failed: ${error.message}.`);
        }
    }
    if (whiteColumnList) {
        opt.type = 'column';
        try {
            sqlParser.whiteListCheck(outputString, whiteColumnList, opt);
        }
        catch (err) {
            pass = inverse;
            const error = err;
            failureReasons.push(`SQL validation failed: ${error.message}.`);
        }
    }
    if (inverse && pass === false && failureReasons.length === 0) {
        failureReasons.push('The output SQL statement is valid');
    }
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass ? 'Assertion passed' : failureReasons.join(' '),
        assertion,
    };
};
exports.handleIsSql = handleIsSql;
const handleContainsSql = async (assertionParams) => {
    const match = (0, utils_1.coerceString)(assertionParams.outputString).match(/```(?:sql)?([^`]+)```/);
    if (match) {
        const sqlCode = match[1].trim();
        return (0, exports.handleIsSql)({ ...assertionParams, outputString: sqlCode });
    }
    return (0, exports.handleIsSql)(assertionParams);
};
exports.handleContainsSql = handleContainsSql;
//# sourceMappingURL=sql.js.map