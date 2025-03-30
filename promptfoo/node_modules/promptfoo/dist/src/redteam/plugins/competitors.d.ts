import type { AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:competitors";
export declare class CompetitorsGrader extends RedteamGraderBase {
    id: string;
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, test, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
        test: any;
    }): ResultSuggestion[];
}
//# sourceMappingURL=competitors.d.ts.map