import { defineEnvVars } from "@sveltejs/kit/env";
import * as v from "valibot";

const optional = v.optional(v.string());

export const sharedVariables = defineEnvVars({
    PUBLIC_STATS_URL: {
        public: true,
        schema: optional,
    },
    PUBLIC_ACCOUNT_URL: {
        public: true,
        schema: optional,
    },
    PUBLIC_STUDIO_URL: {
        public: true,
        schema: optional,
    },
    PUBLIC_URL: {
        public: true,
    },
});
