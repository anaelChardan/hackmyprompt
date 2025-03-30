"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrompt = getPrompt;
const envars_1 = require("../envars");
const heliconeApiKey = (0, envars_1.getEnvString)('HELICONE_API_KEY');
const buildFilter = (majorVersion, minorVersion) => {
    const filter = {};
    if (majorVersion === undefined && minorVersion === undefined) {
        return filter;
    }
    if (majorVersion !== undefined) {
        filter.left = {
            prompts_versions: {
                major_version: {
                    equals: majorVersion,
                },
            },
        };
    }
    if (minorVersion === undefined) {
        filter.operator = 'and';
        filter.right = 'all';
    }
    else {
        if (!filter.left) {
            filter.left = {
                prompts_versions: {
                    minor_version: {
                        equals: minorVersion,
                    },
                },
            };
            filter.operator = 'and';
            filter.right = 'all';
            return filter;
        }
        filter.operator = 'and';
        filter.right = {
            prompts_versions: {
                minor_version: {
                    equals: minorVersion,
                },
            },
        };
    }
    return filter;
};
async function getPrompt(id, variables, majorVersion, minorVersion) {
    const getHeliconePrompt = async (id, majorVersion, minorVersion, variables) => {
        const res = await fetch(`https://api.helicone.ai/v1/prompt/${id}/compile`, {
            headers: {
                Authorization: `Bearer ${heliconeApiKey}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                filter: buildFilter(majorVersion, minorVersion),
                inputs: variables,
            }),
        });
        return (await res.json());
    };
    const heliconePrompt = await getHeliconePrompt(id, majorVersion, minorVersion, variables);
    if (heliconePrompt.error) {
        throw new Error(heliconePrompt.error);
    }
    return heliconePrompt.data?.prompt_compiled;
}
//# sourceMappingURL=helicone.js.map