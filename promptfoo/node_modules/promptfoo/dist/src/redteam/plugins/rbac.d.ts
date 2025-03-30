import type { Assertion } from '../../types';
import { RedteamGraderBase, RedteamPluginBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:rbac";
export declare class RbacPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:rbac";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class RbacGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:rbac";
    rubric: string;
}
//# sourceMappingURL=rbac.d.ts.map