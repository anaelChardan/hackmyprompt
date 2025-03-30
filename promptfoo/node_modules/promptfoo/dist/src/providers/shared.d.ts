/**
 * The default timeout for API requests in milliseconds.
 */
export declare const REQUEST_TIMEOUT_MS: number;
interface ModelCost {
    input: number;
    output: number;
    audioInput?: number;
    audioOutput?: number;
}
interface ProviderModel {
    id: string;
    cost?: ModelCost;
}
export interface ProviderConfig {
    cost?: number;
    audioCost?: number;
}
/**
 * Calculates the cost of an API call based on the model and token usage.
 *
 * @param {string} modelName The name of the model used.
 * @param {ProviderConfig} config The provider configuration.
 * @param {number | undefined} promptTokens The number of tokens in the prompt.
 * @param {number | undefined} completionTokens The number of tokens in the completion.
 * @param {ProviderModel[]} models An array of available models with their costs.
 * @returns {number | undefined} The calculated cost, or undefined if it can't be calculated.
 */
export declare function calculateCost(modelName: string, config: ProviderConfig, promptTokens: number | undefined, completionTokens: number | undefined, models: ProviderModel[]): number | undefined;
/**
 * Parses a chat prompt string into a structured format.
 *
 * @template T The expected return type of the parsed prompt.
 * @param {string} prompt The input prompt string to parse.
 * @param {T} defaultValue The default value to return if parsing fails.
 * @returns {T} The parsed prompt or the default value.
 * @throws {Error} If the prompt is invalid YAML or JSON (when required).
 */
export declare function parseChatPrompt<T>(prompt: string, defaultValue: T): T;
/**
 * Converts a string to title case.
 *
 * @param {string} str The input string to convert.
 * @returns {string} The input string converted to title case.
 */
export declare function toTitleCase(str: string): string;
export {};
//# sourceMappingURL=shared.d.ts.map