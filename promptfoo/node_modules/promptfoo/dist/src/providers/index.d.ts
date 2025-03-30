import type { LoadApiProviderContext, TestSuiteConfig } from '../types';
import type { EnvOverrides } from '../types/env';
import type { ApiProvider } from '../types/providers';
export declare function loadApiProvider(providerPath: string, context?: LoadApiProviderContext): Promise<ApiProvider>;
export declare function loadApiProviders(providerPaths: TestSuiteConfig['providers'], options?: {
    basePath?: string;
    env?: EnvOverrides;
}): Promise<ApiProvider[]>;
//# sourceMappingURL=index.d.ts.map