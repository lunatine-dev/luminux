export const SWAGGER_TAGS = {
    SYSTEM: "System",
    AUTH: "Auth",
    USER: "User",
    WS: "Websocket",
} as const;

export const TAG_METADATA = [
    { name: SWAGGER_TAGS.SYSTEM, description: "System health / Utility" },
    { name: SWAGGER_TAGS.AUTH, description: "Authentication and OAuth flow" },
    {
        name: SWAGGER_TAGS.USER,
        description: "User profile and management",
    },
    {
        name: SWAGGER_TAGS.WS,
        description: "Websocket server",
    },
];

export const SECURITY = [
    {
        bearerAuth: [],
    },
];
