import { defineEnvVars } from "@sveltejs/kit/env";
import * as v from "valibot";

const optional = v.optional(v.string());

export const sharedVariables = defineEnvVars({
    PUBLIC_STATS_URL: {
        static: true,
        public: true,
        schema: optional,
    },
    PUBLIC_ACCOUNT_URL: {
        static: true,
        public: true,
        schema: optional,
    },
    PUBLIC_STUDIO_URL: {
        static: true,
        public: true,
        schema: optional,
    },
    PUBLIC_URL: {
        static: true,
        public: true,
    },
});
