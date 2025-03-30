import type { RedteamStrategyObject, TestCase, TestCaseWithPlugin } from '../../types';
export interface Strategy {
    id: string;
    action: (testCases: TestCaseWithPlugin[], injectVar: string, config: Record<string, any>) => Promise<TestCase[]>;
}
export declare const Strategies: Strategy[];
export declare function validateStrategies(strategies: RedteamStrategyObject[]): Promise<void>;
export declare function loadStrategy(strategyPath: string): Promise<Strategy>;
//# sourceMappingURL=index.d.ts.map