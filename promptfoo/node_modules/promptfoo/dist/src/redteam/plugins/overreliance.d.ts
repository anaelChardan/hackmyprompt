import type { Assertion, AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase, RedteamPluginBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:overreliance";
export declare class OverreliancePlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:overreliance";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class OverrelianceGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:overreliance";
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=overreliance.d.ts.map