"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.novaOutputFromMessage = novaOutputFromMessage;
exports.novaParseMessages = novaParseMessages;
function novaOutputFromMessage(response) {
    const hasToolUse = response.output?.message?.content.some((block) => block.toolUse?.toolUseId);
    if (hasToolUse) {
        return response.output?.message?.content
            .map((block) => {
            if (block.text) {
                // Filter out text for tool use blocks.
                // Observed nova-lite wrapping tool use blocks with text blocks.
                return null;
            }
            return JSON.stringify(block.toolUse);
        })
            .filter((block) => block)
            .join('\n\n');
    }
    return response.output?.message?.content
        .map((block) => {
        return block.text;
    })
        .join('\n\n');
}
function novaParseMessages(messages) {
    try {
        const parsed = JSON.parse(messages);
        if (Array.isArray(parsed)) {
            const systemMessage = parsed.find((msg) => msg.role === 'system');
            return {
                extractedMessages: parsed
                    .filter((msg) => msg.role !== 'system')
                    .map((msg) => ({
                    role: msg.role,
                    content: Array.isArray(msg.content) ? msg.content : [{ text: msg.content }],
                })),
                system: systemMessage
                    ? Array.isArray(systemMessage.content)
                        ? systemMessage.content
                        : [{ text: systemMessage.content }]
                    : undefined,
            };
        }
    }
    catch {
        // Not JSON, parse as plain text
    }
    const lines = messages
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line);
    let system;
    const extractedMessages = [];
    let currentRole = null;
    let currentContent = [];
    const pushMessage = () => {
        if (currentRole && currentContent.length > 0) {
            extractedMessages.push({
                role: currentRole,
                content: [{ text: currentContent.join('\n') }],
            });
            currentContent = [];
        }
    };
    for (const line of lines) {
        if (line.startsWith('system:')) {
            system = [{ text: line.slice(7).trim() }];
        }
        else if (line.startsWith('user:') || line.startsWith('assistant:')) {
            pushMessage();
            currentRole = line.startsWith('user:') ? 'user' : 'assistant';
            currentContent.push(line.slice(line.indexOf(':') + 1).trim());
        }
        else if (currentRole) {
            currentContent.push(line);
        }
        else {
            // If no role is set, assume it's a user message
            currentRole = 'user';
            currentContent.push(line);
        }
    }
    pushMessage();
    if (extractedMessages.length === 0 && !system) {
        extractedMessages.push({
            role: 'user',
            content: [{ text: messages.trim() }],
        });
    }
    return { system, extractedMessages };
}
//# sourceMappingURL=bedrockUtil.js.map