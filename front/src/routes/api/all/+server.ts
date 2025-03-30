import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch }) => {

    const res = await fetch('http://localhost:3555/all-results');

    const body = await res.json();

    console.log(body);
    return json({
        ...body
    });
};
