import type { AzureCompletionOptions } from './types';
/**
 * Throws a configuration error with standard formatting and documentation link
 */
export declare function throwConfigurationError(message: string): never;
/**
 * Calculate Azure cost based on model name and token usage
 */
export declare function calculateAzureCost(modelName: string, config: AzureCompletionOptions, promptTokens?: number, completionTokens?: number): number | undefined;
//# sourceMappingURL=util.d.ts.map