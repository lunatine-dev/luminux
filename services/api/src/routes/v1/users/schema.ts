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

// --- Static Types for Handlers ---
export type LocalUserSuccessResponseType = Static<typeof LocalUserSuccessResponse>;

// --- Schemas ---
export const Schemas = {
    LocalUser: {
        tags: [SWAGGER_TAGS.USER],
        summary: "Fetch logged in user information",
        security: [...SECURITY],
        response: {
            200: LocalUserSuccessResponse,
            401: ErrorResponse,
        },
    } satisfies FastifySchema,
};

// --- Handler Types ---
export type LocalUserHandler = RouteHandler<{
    Reply: StandardReply<LocalUserSuccessResponseType>;
}>;
