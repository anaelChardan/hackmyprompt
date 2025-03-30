import type { ApiProvider, DefaultProviders } from '../types';
import type { EnvOverrides } from '../types/env';
/**
 * This will override all of the completion type providers defined in the constant COMPLETION_PROVIDERS
 * @param provider - The provider to set as the default completion provider.
 */
export declare function setDefaultCompletionProviders(provider: ApiProvider): Promise<void>;
export declare function setDefaultEmbeddingProviders(provider: ApiProvider): Promise<void>;
export declare function getDefaultProviders(env?: EnvOverrides): Promise<DefaultProviders>;
//# sourceMappingURL=defaults.d.ts.map