"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redteamRouter = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const cliState_1 = __importDefault(require("../../cliState"));
const logger_1 = __importDefault(require("../../logger"));
const remoteGeneration_1 = require("../../redteam/remoteGeneration");
const shared_1 = require("../../redteam/shared");
const eval_1 = require("./eval");
exports.redteamRouter = (0, express_1.Router)();
// Track the current running job
let currentJobId = null;
let currentAbortController = null;
exports.redteamRouter.post('/run', async (req, res) => {
    // If there's a current job running, abort it
    if (currentJobId) {
        if (currentAbortController) {
            currentAbortController.abort();
        }
        const existingJob = eval_1.evalJobs.get(currentJobId);
        if (existingJob) {
            existingJob.status = 'error';
            existingJob.logs.push('Job cancelled - new job started');
        }
    }
    const { config, force, verbose, delay } = req.body;
    const id = (0, uuid_1.v4)();
    currentJobId = id;
    currentAbortController = new AbortController();
    // Initialize job status with empty logs array
    eval_1.evalJobs.set(id, {
        evalId: null,
        status: 'in-progress',
        progress: 0,
        total: 0,
        result: null,
        logs: [],
    });
    // Set web UI mode
    cliState_1.default.webUI = true;
    // Run redteam in background
    (0, shared_1.doRedteamRun)({
        liveRedteamConfig: config,
        force,
        verbose,
        delay: Number(delay || '0'),
        logCallback: (message) => {
            if (currentJobId === id) {
                const job = eval_1.evalJobs.get(id);
                if (job) {
                    job.logs.push(message);
                }
            }
        },
        abortSignal: currentAbortController.signal,
    })
        .then(async (evalResult) => {
        const summary = evalResult ? await evalResult.toEvaluateSummary() : null;
        const job = eval_1.evalJobs.get(id);
        if (job && currentJobId === id) {
            job.status = 'complete';
            job.result = summary;
            job.evalId = evalResult?.id ?? null;
        }
        if (currentJobId === id) {
            cliState_1.default.webUI = false;
            currentJobId = null;
            currentAbortController = null;
        }
    })
        .catch((error) => {
        logger_1.default.error(`Error running redteam: ${error}`);
        const job = eval_1.evalJobs.get(id);
        if (job && currentJobId === id) {
            job.status = 'error';
            job.logs.push(`Error: ${error.message}`);
        }
        if (currentJobId === id) {
            cliState_1.default.webUI = false;
            currentJobId = null;
            currentAbortController = null;
        }
    });
    res.json({ id });
});
exports.redteamRouter.post('/cancel', async (req, res) => {
    if (!currentJobId) {
        res.status(400).json({ error: 'No job currently running' });
        return;
    }
    const jobId = currentJobId;
    if (currentAbortController) {
        currentAbortController.abort();
    }
    const job = eval_1.evalJobs.get(jobId);
    if (job) {
        job.status = 'error';
        job.logs.push('Job cancelled by user');
    }
    // Clear state
    cliState_1.default.webUI = false;
    currentJobId = null;
    currentAbortController = null;
    // Wait a moment to ensure cleanup
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.json({ message: 'Job cancelled' });
});
// NOTE: This comes last, so the other routes take precedence
exports.redteamRouter.post('/:task', async (req, res) => {
    const { task } = req.params;
    const cloudFunctionUrl = (0, remoteGeneration_1.getRemoteGenerationUrl)();
    logger_1.default.debug(`Received ${task} task request: ${JSON.stringify({
        method: req.method,
        url: req.url,
        body: req.body,
    })}`);
    try {
        logger_1.default.debug(`Sending request to cloud function: ${cloudFunctionUrl}`);
        const response = await fetch(cloudFunctionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task,
                ...req.body,
            }),
        });
        if (!response.ok) {
            logger_1.default.error(`Cloud function responded with status ${response.status}`);
            throw new Error(`Cloud function responded with status ${response.status}`);
        }
        const data = await response.json();
        logger_1.default.debug(`Received response from cloud function: ${JSON.stringify(data)}`);
        res.json(data);
    }
    catch (error) {
        logger_1.default.error(`Error in ${task} task: ${error}`);
        res.status(500).json({ error: `Failed to process ${task} task` });
    }
});
exports.redteamRouter.get('/status', async (req, res) => {
    res.json({
        hasRunningJob: currentJobId !== null,
        jobId: currentJobId,
    });
});
//# sourceMappingURL=redteam.js.map