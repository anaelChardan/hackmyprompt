import type { Assertion } from '../../types';
import { RedteamPluginBase, RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:debug-access";
export declare class DebugAccessPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:debug-access";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class DebugAccessGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:debug-access";
    rubric: string;
}
//# sourceMappingURL=debugAccess.d.ts.map