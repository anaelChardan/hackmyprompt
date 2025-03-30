import type { ApiProvider, ProviderOptions } from '../types';
import type { EnvOverrides } from '../types/env';
/**
 * Creates a TogetherAI provider using OpenAI-compatible endpoints
 *
 * TogetherAI supports many parameters beyond standard OpenAI ones.
 * All parameters are automatically passed through to the TogetherAI API.
 */
export declare function createTogetherAiProvider(providerPath: string, options?: {
    config?: ProviderOptions;
    id?: string;
    env?: EnvOverrides;
}): ApiProvider;
//# sourceMappingURL=togetherai.d.ts.map