import type { PluginActionParams, PluginConfig, TestCase } from '../../types';
export interface PluginFactory {
    key: string;
    validate?: (config: PluginConfig) => void;
    action: (params: PluginActionParams) => Promise<TestCase[]>;
}
export declare const Plugins: PluginFactory[];
//# sourceMappingURL=index.d.ts.map