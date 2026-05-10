export const SWAGGER_TAGS = {
    SYSTEM: "System",
    AUTH: "Auth",
} as const;

export const TAG_METADATA = [
    { name: SWAGGER_TAGS.SYSTEM, description: "System health / Utility" },
    { name: SWAGGER_TAGS.AUTH, description: "Authentication and OAuth flow" },
];

export const SECURITY = [
    {
        bearerAuth: [],
    },
];
