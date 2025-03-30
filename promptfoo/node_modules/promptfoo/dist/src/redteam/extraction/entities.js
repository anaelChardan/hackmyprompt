"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEntities = extractEntities;
const dedent_1 = __importDefault(require("dedent"));
const logger_1 = __importDefault(require("../../logger"));
const remoteGeneration_1 = require("../remoteGeneration");
const util_1 = require("./util");
async function extractEntities(provider, prompts) {
    if ((0, remoteGeneration_1.shouldGenerateRemote)()) {
        try {
            const result = await (0, util_1.fetchRemoteGeneration)('entities', prompts);
            return result;
        }
        catch (error) {
            logger_1.default.warn(`[Entity Extraction] Failed, returning 0 entities. Error using remote generation: ${error}`);
            return [];
        }
    }
    // Fallback to local extraction
    const prompt = (0, dedent_1.default) `
    TASK: Extract only real-world entities from the following prompts.

    ENTITIES TO EXTRACT:
    - Person names (e.g., "John Smith", "Barack Obama")
    - Brand names (e.g., "Google", "Apple")
    - Organization names (e.g., "United Nations", "Stanford University")
    - Location names (e.g., "New York", "Mount Everest")
    - Specific identifiers (e.g., "ID-12345", "License-ABC")

    DO NOT EXTRACT:
    - Template variables in double curly braces like {{image}}, {{prompt}}, {{question}}
    - Prompt template roles like "system", "user", "assistant", "developer"
    - Generic terms that aren't specific named entities

    PROMPTS TO ANALYZE:

    ${(0, util_1.formatPrompts)(prompts)}
    
    FORMAT: Begin each entity with "Entity:" on a new line.
  `;
    try {
        const entities = await (0, util_1.callExtraction)(provider, prompt, (output) => {
            const entities = output
                .split('\n')
                .filter((line) => line.trim().startsWith('Entity:'))
                .map((line) => line.substring(line.indexOf('Entity:') + 'Entity:'.length).trim())
                // Filter out Nunjucks template variables (any text wrapped in double curly braces)
                .filter((entity) => !/^\{\{\s*[^{}]+\s*\}\}$/.test(entity));
            if (entities.length === 0) {
                logger_1.default.debug('No entities were extracted from the prompts.');
            }
            return entities;
        });
        return entities;
    }
    catch (error) {
        logger_1.default.warn(`Error using local extraction, returning empty list: ${error}`);
        return [];
    }
}
//# sourceMappingURL=entities.js.map