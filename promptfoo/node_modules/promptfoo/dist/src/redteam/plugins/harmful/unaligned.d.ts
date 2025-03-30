import type { PluginActionParams, TestCase } from '../../../types';
import type { UNALIGNED_PROVIDER_HARM_PLUGINS } from '../../constants';
export declare const PLUGIN_ID = "promptfoo:redteam:harmful";
export declare function getHarmfulTests({ purpose, injectVar, n, delayMs }: PluginActionParams, plugin: keyof typeof UNALIGNED_PROVIDER_HARM_PLUGINS): Promise<TestCase[]>;
//# sourceMappingURL=unaligned.d.ts.map