"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionsResult = exports.DEFAULT_TOKENS_USED = void 0;
const envars_1 = require("../envars");
const types_1 = require("../types");
exports.DEFAULT_TOKENS_USED = {
    total: 0,
    prompt: 0,
    completion: 0,
    cached: 0,
};
class AssertionsResult {
    static noAssertsResult() {
        return {
            pass: true,
            score: 1,
            reason: 'No assertions',
            tokensUsed: { ...exports.DEFAULT_TOKENS_USED },
            assertion: null,
        };
    }
    constructor({ threshold, parentAssertionSet, } = {}) {
        this.tokensUsed = {
            ...exports.DEFAULT_TOKENS_USED,
        };
        this.totalScore = 0;
        this.totalWeight = 0;
        this.componentResults = [];
        this.namedScores = {};
        this.result = null;
        this.failedContentSafetyChecks = false;
        this.threshold = threshold;
        this._parentAssertionSet = parentAssertionSet;
    }
    get parentAssertionSet() {
        return this._parentAssertionSet;
    }
    addResult({ index, result, metric, weight = 1, }) {
        this.totalScore += result.score * weight;
        this.totalWeight += weight;
        this.componentResults[index] = result;
        const isRedteamGuardrail = result.assertion?.type === 'guardrails' && result.assertion?.config?.purpose === 'redteam';
        if (isRedteamGuardrail && !result.pass) {
            this.failedContentSafetyChecks = true;
        }
        if (metric) {
            this.namedScores[metric] = (this.namedScores[metric] || 0) + result.score;
        }
        if (result.namedScores) {
            Object.entries(result.namedScores).forEach(([metricName, score]) => {
                if (metricName !== metric) {
                    this.namedScores[metricName] = (this.namedScores[metricName] || 0) + score;
                }
            });
        }
        if (result.tokensUsed) {
            this.tokensUsed.total += result.tokensUsed.total || 0;
            this.tokensUsed.prompt += result.tokensUsed.prompt || 0;
            this.tokensUsed.completion += result.tokensUsed.completion || 0;
            this.tokensUsed.cached += result.tokensUsed.cached || 0;
        }
        if (result.pass) {
            return;
        }
        this.failedReason = result.reason;
        if ((0, envars_1.getEnvBool)('PROMPTFOO_SHORT_CIRCUIT_TEST_FAILURES')) {
            throw new Error(result.reason);
        }
    }
    async testResult(scoringFunction) {
        if (this.result) {
            return this.result;
        }
        const score = this.totalWeight > 0 ? this.totalScore / this.totalWeight : 0;
        let pass = !this.failedReason;
        let reason = this.failedReason ? this.failedReason : 'All assertions passed';
        if (this.threshold) {
            // Existence of a test threshold overrides the pass/fail status of individual assertions
            pass = score >= this.threshold;
            if (pass) {
                reason = `Aggregate score ${score.toFixed(2)} ≥ ${this.threshold} threshold`;
            }
            else {
                reason = `Aggregate score ${score.toFixed(2)} < ${this.threshold} threshold`;
            }
        }
        if (this.failedContentSafetyChecks) {
            pass = true;
            reason = 'Content failed guardrail safety checks';
        }
        // Flatten nested component results, and copy the assertion into the child results.
        const flattenedComponentResults = this.componentResults.flatMap((result) => {
            if (result.componentResults) {
                return [
                    result,
                    ...result.componentResults.map((subResult) => ({
                        ...subResult,
                        assertion: subResult.assertion || result.assertion,
                    })),
                ];
            }
            else {
                return result;
            }
        });
        this.result = {
            pass,
            score,
            reason,
            namedScores: this.namedScores,
            tokensUsed: this.tokensUsed,
            componentResults: flattenedComponentResults,
            assertion: null,
        };
        if (scoringFunction) {
            try {
                const scoringResult = await scoringFunction(this.namedScores, {
                    threshold: this.threshold,
                    parentAssertionSet: this._parentAssertionSet,
                    componentResults: flattenedComponentResults,
                    tokensUsed: this.tokensUsed,
                });
                if (!(0, types_1.isGradingResult)(scoringResult)) {
                    throw new Error('assertion scoring function must return a GradingResult');
                }
                this.result = {
                    ...this.result,
                    ...scoringResult,
                };
            }
            catch (err) {
                this.result.pass = false;
                this.result.score = 0;
                this.result.reason = `Scoring function error: ${err.message}`;
            }
        }
        return this.result;
    }
}
exports.AssertionsResult = AssertionsResult;
//# sourceMappingURL=assertionsResult.js.map