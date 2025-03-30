"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualInputProvider = void 0;
const editor_1 = __importDefault(require("@inquirer/editor"));
const input_1 = __importDefault(require("@inquirer/input"));
class ManualInputProvider {
    constructor(options = {}) {
        this.config = options.config;
        this.id = () => options.id || 'manual-input';
    }
    id() {
        return 'promptfoo:manual-input';
    }
    async callApi(prompt) {
        console.log('='.repeat(80));
        console.log('Manual Input Provider');
        console.log('Prompt:');
        console.log('*'.repeat(40));
        console.log(prompt);
        console.log('*'.repeat(40));
        console.log('\nPlease enter the output:');
        const output = await (this.config?.multiline ? editor_1.default : input_1.default)({ message: 'Output:' });
        console.log('='.repeat(80));
        return {
            output,
        };
    }
}
exports.ManualInputProvider = ManualInputProvider;
//# sourceMappingURL=manualInput.js.map