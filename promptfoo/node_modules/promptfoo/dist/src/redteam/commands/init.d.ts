import type { Command } from 'commander';
import type { ProviderOptions, RedteamPluginObject } from '../../types';
import { type Plugin, type Strategy } from '../constants';
export declare function renderRedteamConfig({ descriptions, numTests, plugins, prompts, providers, purpose, strategies, }: {
    descriptions: Record<string, string>;
    numTests: number;
    plugins: (Plugin | RedteamPluginObject)[];
    prompts: string[];
    providers: (string | ProviderOptions)[];
    purpose: string | undefined;
    strategies: Strategy[];
}): string;
export declare function redteamInit(directory: string | undefined): Promise<void>;
export declare function initCommand(program: Command): void;
//# sourceMappingURL=init.d.ts.map