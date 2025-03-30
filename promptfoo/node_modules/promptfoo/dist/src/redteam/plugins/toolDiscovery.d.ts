import type { Assertion } from '../../types';
import { RedteamPluginBase, RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:tool-discovery";
export declare class ToolDiscoveryPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:tool-discovery";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class ToolDiscoveryGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:tool-discovery";
    rubric: string;
}
//# sourceMappingURL=toolDiscovery.d.ts.map