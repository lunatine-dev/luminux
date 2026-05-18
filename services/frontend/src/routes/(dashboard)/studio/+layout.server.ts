// src/routes/studio/(dashboard)/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        token: locals.token,
    };
};
