import { defineEnvVars } from "@sveltejs/kit/env";

export const sharedVariables = defineEnvVars({
    PUBLIC_STATS_URL: {
        public: true,
    },
    PUBLIC_ACCOUNT_URL: {
        public: true,
    },
    PUBLIC_STUDIO_URL: {
        public: true,
    },
    PUBLIC_URL: {
        public: true,
    },
});
