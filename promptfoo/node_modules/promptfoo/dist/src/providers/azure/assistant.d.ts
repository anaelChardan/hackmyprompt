import type { CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import { AzureGenericProvider } from './generic';
import type { AzureAssistantOptions, AzureAssistantProviderOptions } from './types';
export declare class AzureAssistantProvider extends AzureGenericProvider {
    assistantConfig: AzureAssistantOptions;
    private loadedFunctionCallbacks;
    constructor(deploymentName: string, options?: AzureAssistantProviderOptions);
    /**
     * Preloads all function callbacks to ensure they're ready when needed
     */
    private preloadFunctionCallbacks;
    /**
     * Loads a function from an external file
     * @param fileRef The file reference in the format 'file://path/to/file:functionName'
     * @returns The loaded function
     */
    private loadExternalFunction;
    /**
     * Executes a function callback with proper error handling
     */
    private executeFunctionCallback;
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
    /**
     * Format error responses consistently
     */
    private formatError;
    /**
     * Helper method to make HTTP requests using fetchWithCache
     */
    private makeRequest;
    /**
     * Get headers for API requests
     */
    private getHeaders;
    /**
     * Helper methods to check for specific error types
     */
    private isRateLimitError;
    private isServiceError;
    private isServerError;
    private isRetryableError;
    /**
     * Poll a run until it completes or fails
     */
    private pollRun;
    /**
     * Handle tool calls during run polling
     */
    private pollRunWithToolCallHandling;
    /**
     * Process a completed run to extract messages and tool calls
     */
    private processCompletedRun;
}
//# sourceMappingURL=assistant.d.ts.map