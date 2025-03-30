import type { ApiProvider, ProviderResponse } from '../types';
interface ManualInputProviderOptions {
    id?: string;
    config?: {
        multiline?: boolean;
    };
}
export declare class ManualInputProvider implements ApiProvider {
    config: ManualInputProviderOptions['config'];
    constructor(options?: ManualInputProviderOptions);
    id(): string;
    callApi(prompt: string): Promise<ProviderResponse>;
}
export {};
//# sourceMappingURL=manualInput.d.ts.map