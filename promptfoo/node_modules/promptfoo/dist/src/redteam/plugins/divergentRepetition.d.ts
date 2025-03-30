import type { Assertion, AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase, RedteamPluginBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:divergent-repetition";
export declare class DivergentRepetitionPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:divergent-repetition";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class DivergentRepetitionGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:divergent-repetition";
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=divergentRepetition.d.ts.map