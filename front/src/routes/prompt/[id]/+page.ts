import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch('/api/all');
    const body = await res.json();
    console.log(body);

    const id = params.id;
    console.log(id);

    const prompt = body[id];
    console.log(prompt);

    return {
        prompt
    };
};
