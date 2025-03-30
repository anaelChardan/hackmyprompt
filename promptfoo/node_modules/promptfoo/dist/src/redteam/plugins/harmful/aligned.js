"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlignedHarmfulPlugin = void 0;
const invariant_1 = __importDefault(require("../../../util/invariant"));
const base_1 = require("../base");
const common_1 = require("./common");
const constants_1 = require("./constants");
class AlignedHarmfulPlugin extends base_1.RedteamPluginBase {
    get id() {
        return `promptfoo:redteam:${this.harmCategory}`;
    }
    constructor(provider, purpose, injectVar, harmCategory, config = {}) {
        super(provider, purpose, injectVar, config);
        this.harmCategory = harmCategory;
    }
    async getTemplate() {
        const categoryConfig = constants_1.REDTEAM_MODEL_CATEGORIES.find((c) => c.key === this.harmCategory);
        (0, invariant_1.default)(categoryConfig, `Harmful category ${this.harmCategory} not found`);
        return categoryConfig.prompt;
    }
    getAssertions(prompt) {
        return (0, common_1.getHarmfulAssertions)(this.harmCategory);
    }
    promptsToTestCases(prompts) {
        return prompts.map(({ prompt }) => (0, common_1.createTestCase)(this.injectVar, prompt, this.harmCategory));
    }
}
exports.AlignedHarmfulPlugin = AlignedHarmfulPlugin;
//# sourceMappingURL=aligned.js.map