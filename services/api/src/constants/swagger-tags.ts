export const SWAGGER_TAGS = {
    SYSTEM: "System",
} as const;

export const TAG_METADATA = [{ name: SWAGGER_TAGS.SYSTEM, description: "System health / Utility" }];

export const SECURITY = [
    {
        bearerAuth: [],
    },
];
