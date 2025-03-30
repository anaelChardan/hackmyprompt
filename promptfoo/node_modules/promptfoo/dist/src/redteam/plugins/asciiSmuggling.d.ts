import type { AtomicTestCase, GradingResult } from '../../types';
import { RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:ascii-smuggling";
export declare class AsciiSmugglingGrader extends RedteamGraderBase {
    id: string;
    rubric: string;
    getResult(prompt: string, llmOutput: string, test: AtomicTestCase): Promise<{
        grade: GradingResult;
        rubric: string;
    }>;
}
//# sourceMappingURL=asciiSmuggling.d.ts.map