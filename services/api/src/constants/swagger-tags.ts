export const SWAGGER_TAGS = {
    SYSTEM: "System",
    AUTH: "Auth",
    USER: "User",
} as const;

export const TAG_METADATA = [
    { name: SWAGGER_TAGS.SYSTEM, description: "System health / Utility" },
    { name: SWAGGER_TAGS.AUTH, description: "Authentication and OAuth flow" },
    {
        name: SWAGGER_TAGS.USER,
        description: "User profile and management",
    },
];

export const SECURITY = [
    {
        bearerAuth: [],
    },
];
