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
exports.getPrompt = getPrompt;
const envars_1 = require("../envars");
const langfuseParams = {
    publicKey: (0, envars_1.getEnvString)('LANGFUSE_PUBLIC_KEY'),
    secretKey: (0, envars_1.getEnvString)('LANGFUSE_SECRET_KEY'),
    baseUrl: (0, envars_1.getEnvString)('LANGFUSE_HOST'),
};
let langfuse;
async function getPrompt(id, vars, type, version) {
    let prompt;
    if (!langfuse) {
        const { Langfuse } = await Promise.resolve().then(() => __importStar(require('langfuse')));
        langfuse = new Langfuse(langfuseParams);
    }
    if (type === 'text' || type === undefined) {
        prompt = await langfuse.getPrompt(id, version, { type: 'text' });
    }
    else {
        prompt = await langfuse.getPrompt(id, version, { type: 'chat' });
    }
    const compiledPrompt = prompt.compile(vars);
    if (typeof compiledPrompt !== 'string') {
        return JSON.stringify(compiledPrompt);
    }
    return compiledPrompt;
}
//# sourceMappingURL=langfuse.js.map