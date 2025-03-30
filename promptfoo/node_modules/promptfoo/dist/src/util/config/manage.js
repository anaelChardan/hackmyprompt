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
exports.getConfigDirectoryPath = getConfigDirectoryPath;
exports.setConfigDirectoryPath = setConfigDirectoryPath;
exports.writePromptfooConfig = writePromptfooConfig;
const fs = __importStar(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const envars_1 = require("../../envars");
const logger_1 = __importDefault(require("../../logger"));
const json_1 = require("../json");
let configDirectoryPath = (0, envars_1.getEnvString)('PROMPTFOO_CONFIG_DIR');
function getConfigDirectoryPath(createIfNotExists = false) {
    const p = configDirectoryPath || path.join(os.homedir(), '.promptfoo');
    if (createIfNotExists && !fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true });
    }
    return p;
}
function setConfigDirectoryPath(newPath) {
    configDirectoryPath = newPath;
}
function writePromptfooConfig(config, outputPath) {
    const orderedConfig = (0, json_1.orderKeys)(config, [
        'description',
        'targets',
        'prompts',
        'providers',
        'redteam',
        'defaultTest',
        'tests',
        'scenarios',
    ]);
    const yamlContent = js_yaml_1.default.dump(orderedConfig, { skipInvalid: true });
    if (!yamlContent) {
        logger_1.default.warn('Warning: config is empty, skipping write');
        return orderedConfig;
    }
    fs.writeFileSync(outputPath, `# yaml-language-server: $schema=https://promptfoo.dev/config-schema.json\n${yamlContent}`);
    return orderedConfig;
}
//# sourceMappingURL=manage.js.map