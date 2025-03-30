// place files you want to import through the `$lib` alias in this folder.
import healthResults from './health.json';

export const getResults = (type: string) => {
    function getNamedScoresWithZero(data: any) {
        const zeroNamedScores: Map<string, number> = new Map();

        // Parcours des prompts pour trouver les namedScores avec une valeur de 0
        if (data.results && data.results.results) {
            data.results.results.forEach((prompt: any) => {
                const namedScores = prompt.namedScores;
                if (namedScores) {
                    const [key] = Object.entries(namedScores);
                    console.log('key', key);

                    console.log('key[0]', key[0]);

                    if (key[1] === 0) {
                        zeroNamedScores.set(key[0], key[1]);
                    }
                }
            });
        }
        return zeroNamedScores;
    }

    // Exemple d'utilisation

    let results = null;
    if (type === 'health') {
        results = healthResults;
    }

    if (!results) {
        console.error('No results found for the given type');
        return [];
    }

    const uniqueNamedScores = getNamedScoresWithZero(results);
    console.log('named scores', uniqueNamedScores);
    // return map as array
    const namedScoresArray = Array.from(uniqueNamedScores, ([key, value]) => ({ key, value }));
    const data = namedScoresArray.map(el => {
        return {
            id: el.key,
            label: el.key
        };
    });

    console.log('data', data);

    console.log((data.map(el => el.label)));
    return data;
};
