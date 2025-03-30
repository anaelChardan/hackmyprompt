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
exports.runDbMigrations = runDbMigrations;
const migrator_1 = require("drizzle-orm/better-sqlite3/migrator");
const path = __importStar(require("path"));
const database_1 = require("./database");
const logger_1 = __importDefault(require("./logger"));
/**
 * Run migrations on the database, skipping the ones already applied. Also creates the sqlite db if it doesn't exist.
 */
async function runDbMigrations() {
    try {
        const db = (0, database_1.getDb)();
        const migrationsFolder = path.join(__dirname, '..', 'drizzle');
        logger_1.default.debug(`[DB Migrate] Running migrations from ${migrationsFolder}...`);
        await (0, migrator_1.migrate)(db, { migrationsFolder });
        logger_1.default.debug('[DB Migrate] Migrations completed');
    }
    catch (error) {
        logger_1.default.error(`Error running database migrations: ${error}`);
    }
}
if (require.main === module) {
    runDbMigrations();
}
//# sourceMappingURL=migrate.js.map