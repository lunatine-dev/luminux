import { defineEnvVars } from "@sveltejs/kit/env";
import { sharedVariables } from "@luminux/config/env";

export const variables = defineEnvVars({
    ...sharedVariables,
});
