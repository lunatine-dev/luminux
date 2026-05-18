import type { PageServerLoad } from "./$types";
import type { paths } from "$lib/types/api";

export const load: PageServerLoad = async ({ locals }) => {
    return {
        streamed: {
            sessions: locals.api
                .get<
                    paths["/v1/users/@me/tokens"]["get"]["responses"]["200"]["content"]["application/json"]
                >("/users/@me/tokens")
                .then(({ overlay, overwolf }) => {
                    return {
                        overlay,
                        overwolf,
                    };
                }),
        },
    };
};
