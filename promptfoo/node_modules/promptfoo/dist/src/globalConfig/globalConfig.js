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
exports.readGlobalConfig = readGlobalConfig;
exports.writeGlobalConfig = writeGlobalConfig;
exports.writeGlobalConfigPartial = writeGlobalConfigPartial;
/**
 * Functions for manipulating the global configuration file, which lives at
 * ~/.promptfoo/promptfoo.yaml by default.
 */
const fs = __importStar(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path = __importStar(require("path"));
const manage_1 = require("../util/config/manage");
function readGlobalConfig() {
    const configDir = (0, manage_1.getConfigDirectoryPath)();
    const configFilePath = path.join(configDir, 'promptfoo.yaml');
    let globalConfig = {};
    if (fs.existsSync(configFilePath)) {
        globalConfig = js_yaml_1.default.load(fs.readFileSync(configFilePath, 'utf-8')) || {};
    }
    else {
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        fs.writeFileSync(configFilePath, js_yaml_1.default.dump(globalConfig));
    }
    return globalConfig;
}
function writeGlobalConfig(config) {
    fs.writeFileSync(path.join((0, manage_1.getConfigDirectoryPath)(true), 'promptfoo.yaml') /* createIfNotExists */, js_yaml_1.default.dump(config));
}
/**
 * Merges the top-level keys into existing config.
 * @param partialConfig New keys to merge into the existing config.
 */
function writeGlobalConfigPartial(partialConfig) {
    const currentConfig = readGlobalConfig();
    const updatedConfig = { ...currentConfig };
    for (const key in partialConfig) {
        const value = partialConfig[key];
        if (value) {
            updatedConfig[key] = value;
        }
        else {
            delete updatedConfig[key];
        }
    }
    writeGlobalConfig(updatedConfig);
}
//# sourceMappingURL=globalConfig.js.map