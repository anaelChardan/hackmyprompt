"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLatency = void 0;
const handleLatency = ({ assertion, latencyMs }) => {
    if (!assertion.threshold) {
        throw new Error('Latency assertion must have a threshold in milliseconds');
    }
    if (latencyMs === undefined) {
        throw new Error('Latency assertion does not support cached results. Rerun the eval with --no-cache');
    }
    const pass = latencyMs <= assertion.threshold;
    return {
        pass,
        score: pass ? 1 : 0,
        reason: pass
            ? 'Assertion passed'
            : `Latency ${latencyMs}ms is greater than threshold ${assertion.threshold}ms`,
        assertion,
    };
};
exports.handleLatency = handleLatency;
//# sourceMappingURL=latency.js.map