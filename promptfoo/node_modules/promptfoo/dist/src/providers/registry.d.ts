import type { LoadApiProviderContext } from '../types';
import type { ApiProvider, ProviderOptions } from '../types/providers';
interface ProviderFactory {
    test: (providerPath: string) => boolean;
    create: (providerPath: string, providerOptions: ProviderOptions, context: LoadApiProviderContext) => Promise<ApiProvider>;
}
export declare const providerMap: ProviderFactory[];
export {};
//# sourceMappingURL=registry.d.ts.map