import type { FastifySchema, RouteHandler } from "fastify";
import { Type, Static } from "typebox";
import { ErrorResponse, StandardReply } from "@defs/http";
import { SECURITY, SWAGGER_TAGS } from "@constants/swagger-tags";

// --- Shared Body Definitions ---
export const LocalUserSuccessResponse = Type.Object(
    {
        username: Type.String(),
        email: Type.String({ format: "email" }),
        email_verified: Type.Boolean(),
        role: Type.String(),
        avatar: Type.Optional(Type.String()),
        subscription: Type.String(),
    },
    {
        $id: "LocalUser",
    },
);
export const TokenResponse = Type.Object({
    overwolf: Type.String(),
    overlay: Type.String(),
});
export const TokenRegenerateResponse = Type.Object({
    success: Type.Boolean(),
    key: Type.String(),
});
export const TokenRegenerateBody = Type.Object({
    target: Type.Enum(["overwolf", "overlay"]),
});

// --- Static Types for Handlers ---
export type LocalUserSuccessResponseType = Static<typeof LocalUserSuccessResponse>;
export type TokenResponseType = Static<typeof TokenResponse>;
export type TokenRegenerateResponseType = Static<typeof TokenRegenerateResponse>;
export type TokenRegenerateBodyType = Static<typeof TokenRegenerateBody>;

// --- Schemas ---
export const Schemas: Record<string, FastifySchema> = {
    LocalUser: {
        tags: [SWAGGER_TAGS.USER],
        summary: "Fetch logged in user information",
        security: [...SECURITY],
        response: {
            200: LocalUserSuccessResponse,
            401: ErrorResponse,
        },
    },
    Tokens: {
        tags: [SWAGGER_TAGS.USER],
        summary: "Fetches API tokens for logged in user",
        security: [...SECURITY],
        response: {
            200: TokenResponse,
            401: ErrorResponse,
            404: ErrorResponse,
        },
    },
    TokenRegenerate: {
        tags: [SWAGGER_TAGS.USER],
        summary: "Regenerates API token",
        body: TokenRegenerateBody,
        security: [...SECURITY],
        response: {
            200: TokenRegenerateResponse,
            401: ErrorResponse,
            500: ErrorResponse,
        },
    },
};

// --- Handler Types ---
export type LocalUserHandler = RouteHandler<{
    Reply: StandardReply<LocalUserSuccessResponseType>;
}>;
export type TokenHandler = RouteHandler<{
    Reply: StandardReply<TokenResponseType>;
}>;
export type TokenRegenerateHandler = RouteHandler<{
    Body: TokenRegenerateBodyType;
    Reply: StandardReply<TokenRegenerateResponseType>;
}>;
