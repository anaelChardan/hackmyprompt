"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isApiProvider = isApiProvider;
exports.isProviderOptions = isProviderOptions;
function isApiProvider(provider) {
    return (typeof provider === 'object' &&
        provider != null &&
        'id' in provider &&
        typeof provider.id === 'function');
}
function isProviderOptions(provider) {
    return (typeof provider === 'object' &&
        provider != null &&
        'id' in provider &&
        typeof provider.id === 'string');
}
//# sourceMappingURL=providers.js.map