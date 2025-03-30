import type { Assertion, AssertionValue, ResultSuggestion } from '../../types';
import { RedteamPluginBase, RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:excessive-agency";
export declare class ExcessiveAgencyPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:excessive-agency";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class ExcessiveAgencyGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:excessive-agency";
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=excessiveAgency.d.ts.map