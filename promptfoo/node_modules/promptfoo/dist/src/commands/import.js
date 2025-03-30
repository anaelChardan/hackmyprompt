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
exports.importCommand = importCommand;
const fs_1 = __importDefault(require("fs"));
const database_1 = require("../database");
const tables_1 = require("../database/tables");
const logger_1 = __importDefault(require("../logger"));
const eval_1 = __importStar(require("../models/eval"));
const evalResult_1 = __importDefault(require("../models/evalResult"));
const telemetry_1 = __importDefault(require("../telemetry"));
function importCommand(program) {
    program
        .command('import <file>')
        .description('Import an eval record from a JSON file')
        .action(async (file) => {
        const db = (0, database_1.getDb)();
        let evalId;
        try {
            const fileContent = fs_1.default.readFileSync(file, 'utf-8');
            const evalData = JSON.parse(fileContent);
            if (evalData.results.version === 3) {
                logger_1.default.debug('Importing v3 eval');
                const evalRecord = await eval_1.default.create(evalData.config, evalData.results.prompts, {
                    id: evalData.id,
                    createdAt: evalData.createdAt,
                    author: evalData.author || 'Unknown',
                });
                await evalResult_1.default.createManyFromEvaluateResult(evalData.results.results, evalRecord.id);
                evalId = evalRecord.id;
            }
            else {
                logger_1.default.debug('Importing v2 eval');
                evalId = evalData.id || (0, eval_1.createEvalId)(evalData.createdAt);
                await db
                    .insert(tables_1.evalsTable)
                    .values({
                    id: evalId,
                    createdAt: evalData.createdAt,
                    author: evalData.author || 'Unknown',
                    description: evalData.description,
                    results: evalData.results,
                    config: evalData.config,
                })
                    .run();
            }
            logger_1.default.info(`Eval with ID ${evalId} has been successfully imported.`);
            telemetry_1.default.record('command_used', {
                name: 'import',
                evalId: evalData.id,
            });
            await telemetry_1.default.send();
        }
        catch (error) {
            logger_1.default.error(`Failed to import eval: ${error}`);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=import.js.map