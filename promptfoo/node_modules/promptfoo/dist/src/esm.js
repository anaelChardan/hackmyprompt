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
exports.getDirectory = getDirectory;
exports.importModule = importModule;
const node_url_1 = require("node:url");
const logger_1 = __importDefault(require("./logger"));
const file_node_1 = require("./util/file.node");
// esm-specific crap that needs to get mocked out in tests
//import path from 'path';
//import { fileURLToPath } from 'url';
function getDirectory() {
    /*
    // @ts-ignore: Jest chokes on this
    const __filename = fileURLToPath(import.meta.url);
    return path.dirname(__filename);
   */
    return __dirname;
}
async function importModule(modulePath, functionName) {
    logger_1.default.debug(`Attempting to import module: ${JSON.stringify({ resolvedPath: (0, file_node_1.safeResolve)(modulePath), moduleId: modulePath })}`);
    try {
        if (modulePath.endsWith('.ts') || modulePath.endsWith('.mjs')) {
            logger_1.default.debug('TypeScript/ESM module detected, importing tsx/cjs');
            // @ts-ignore: It actually works
            await Promise.resolve().then(() => __importStar(require('tsx/cjs')));
        }
        const resolvedPath = (0, node_url_1.pathToFileURL)((0, file_node_1.safeResolve)(modulePath));
        logger_1.default.debug(`Attempting ESM import from: ${resolvedPath.toString()}`);
        const importedModule = await Promise.resolve(`${resolvedPath.toString()}`).then(s => __importStar(require(s)));
        const mod = importedModule?.default?.default || importedModule?.default || importedModule;
        logger_1.default.debug(`Successfully imported module: ${JSON.stringify({ resolvedPath, moduleId: modulePath })}`);
        if (functionName) {
            logger_1.default.debug(`Returning named export: ${functionName}`);
            return mod[functionName];
        }
        return mod;
    }
    catch (err) {
        // If ESM import fails, try CommonJS require as fallback
        logger_1.default.debug(`ESM import failed: ${err}`);
        logger_1.default.debug('Attempting CommonJS require fallback...');
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const importedModule = require((0, file_node_1.safeResolve)(modulePath));
            const mod = importedModule?.default?.default || importedModule?.default || importedModule;
            logger_1.default.debug(`Successfully required module: ${JSON.stringify({ resolvedPath: (0, file_node_1.safeResolve)(modulePath), moduleId: modulePath })}`);
            if (functionName) {
                logger_1.default.debug(`Returning named export: ${functionName}`);
                return mod[functionName];
            }
            return mod;
        }
        catch (requireErr) {
            logger_1.default.debug(`CommonJS require also failed: ${requireErr}`);
            throw requireErr;
        }
    }
}
//# sourceMappingURL=esm.js.map