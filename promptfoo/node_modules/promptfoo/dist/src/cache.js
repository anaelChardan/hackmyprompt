"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = getCache;
exports.fetchWithCache = fetchWithCache;
exports.enableCache = enableCache;
exports.disableCache = disableCache;
exports.clearCache = clearCache;
exports.isCacheEnabled = isCacheEnabled;
const cache_manager_1 = __importDefault(require("cache-manager"));
const cache_manager_fs_hash_1 = __importDefault(require("cache-manager-fs-hash"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const envars_1 = require("./envars");
const fetch_1 = require("./fetch");
const logger_1 = __importDefault(require("./logger"));
const shared_1 = require("./providers/shared");
const manage_1 = require("./util/config/manage");
let cacheInstance;
let enabled = (0, envars_1.getEnvBool)('PROMPTFOO_CACHE_ENABLED', true);
const cacheType = (0, envars_1.getEnvString)('PROMPTFOO_CACHE_TYPE') || ((0, envars_1.getEnvString)('NODE_ENV') === 'test' ? 'memory' : 'disk');
function getCache() {
    if (!cacheInstance) {
        let cachePath = '';
        if (cacheType === 'disk' && enabled) {
            cachePath =
                (0, envars_1.getEnvString)('PROMPTFOO_CACHE_PATH') || path_1.default.join((0, manage_1.getConfigDirectoryPath)(), 'cache');
            if (!fs_1.default.existsSync(cachePath)) {
                logger_1.default.info(`Creating cache folder at ${cachePath}.`);
                fs_1.default.mkdirSync(cachePath, { recursive: true });
            }
        }
        cacheInstance = cache_manager_1.default.caching({
            store: cacheType === 'disk' && enabled ? cache_manager_fs_hash_1.default : 'memory',
            options: {
                max: (0, envars_1.getEnvInt)('PROMPTFOO_CACHE_MAX_FILE_COUNT', 10000), // number of files
                path: cachePath,
                ttl: (0, envars_1.getEnvInt)('PROMPTFOO_CACHE_TTL', 60 * 60 * 24 * 14), // in seconds, 14 days
                maxsize: (0, envars_1.getEnvInt)('PROMPTFOO_CACHE_MAX_SIZE', 1e7), // in bytes, 10mb
                //zip: true, // whether to use gzip compression
            },
        });
    }
    return cacheInstance;
}
async function fetchWithCache(url, options = {}, timeout = shared_1.REQUEST_TIMEOUT_MS, format = 'json', bust = false, maxRetries) {
    if (!enabled || bust) {
        const resp = await (0, fetch_1.fetchWithRetries)(url, options, timeout, maxRetries);
        const respText = await resp.text();
        try {
            return {
                cached: false,
                data: format === 'json' ? JSON.parse(respText) : respText,
                status: resp.status,
                statusText: resp.statusText,
                headers: Object.fromEntries(resp.headers.entries()),
                deleteFromCache: async () => {
                    // No-op when cache is disabled
                },
            };
        }
        catch {
            throw new Error(`Error parsing response as JSON: ${respText}`);
        }
    }
    const copy = Object.assign({}, options);
    delete copy.headers;
    const cacheKey = `fetch:v2:${url}:${JSON.stringify(copy)}`;
    const cache = await getCache();
    let cached = true;
    let errorResponse = null;
    // Use wrap to ensure that the fetch is only done once even for concurrent invocations
    const cachedResponse = await cache.wrap(cacheKey, async () => {
        // Fetch the actual data and store it in the cache
        cached = false;
        const response = await (0, fetch_1.fetchWithRetries)(url, options, timeout, maxRetries);
        const responseText = await response.text();
        const headers = Object.fromEntries(response.headers.entries());
        try {
            const parsedData = format === 'json' ? JSON.parse(responseText) : responseText;
            const data = JSON.stringify({
                data: parsedData,
                status: response.status,
                statusText: response.statusText,
                headers,
            });
            if (!response.ok) {
                if (responseText == '') {
                    errorResponse = JSON.stringify({
                        data: `Empty Response: ${response.status}: ${response.statusText}`,
                        status: response.status,
                        statusText: response.statusText,
                        headers,
                    });
                }
                else {
                    errorResponse = data;
                }
                // Don't cache error responses
                return;
            }
            if (!data) {
                // Don't cache empty responses
                return;
            }
            // Don't cache if the parsed data contains an error
            if (format === 'json' && parsedData?.error) {
                logger_1.default.debug(`Not caching ${url} because it contains an 'error' key: ${parsedData.error}`);
                return data;
            }
            logger_1.default.debug(`Storing ${url} response in cache: ${data}`);
            return data;
        }
        catch (err) {
            throw new Error(`Error parsing response from ${url}: ${err.message}. Received text: ${responseText}`);
        }
    });
    if (cached && cachedResponse) {
        logger_1.default.debug(`Returning cached response for ${url}: ${cachedResponse}`);
    }
    const parsedResponse = JSON.parse((cachedResponse ?? errorResponse));
    return {
        cached,
        data: parsedResponse.data,
        status: parsedResponse.status,
        statusText: parsedResponse.statusText,
        headers: parsedResponse.headers,
        deleteFromCache: async () => {
            await cache.del(cacheKey);
            logger_1.default.debug(`Evicted from cache: ${cacheKey}`);
        },
    };
}
function enableCache() {
    enabled = true;
}
function disableCache() {
    enabled = false;
}
async function clearCache() {
    return getCache().reset();
}
function isCacheEnabled() {
    return enabled;
}
//# sourceMappingURL=cache.js.map