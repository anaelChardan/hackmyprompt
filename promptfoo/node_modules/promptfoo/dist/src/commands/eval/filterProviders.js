"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProviders = filterProviders;
function filterProviders(providers, filterProvidersOption) {
    if (!filterProvidersOption) {
        return providers;
    }
    const filterRegex = new RegExp(filterProvidersOption);
    return providers.filter((provider) => {
        const providerId = provider.id();
        const providerLabel = provider.label;
        return filterRegex.test(providerId) || (providerLabel && filterRegex.test(providerLabel));
    });
}
//# sourceMappingURL=filterProviders.js.map