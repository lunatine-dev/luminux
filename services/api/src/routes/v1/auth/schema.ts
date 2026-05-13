import type { FastifySchema, RouteHandler } from "fastify";
import { Type, Static } from "typebox";
import { ErrorResponse, StandardReply } from "@defs/http";
import { SWAGGER_TAGS } from "@constants/swagger-tags";

// --- Shared Body Definitions ---
export const RefreshBody = Type.Object({
    refreshToken: Type.String(),
});
export const RefreshSuccessResponse = Type.Object({
    accessToken: Type.String(),
    refreshToken: Type.String(),
});

// --- Static Types for Handlers ---
export type RefreshBodyType = Static<typeof RefreshBody>;
export type RefreshSuccessResponseType = Static<typeof RefreshSuccessResponse>;

// --- Schemas ---
export const Schemas = {
    Refresh: {
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Refresh a session",
        body: RefreshBody,
        response: {
            200: RefreshSuccessResponse,
            401: ErrorResponse,
            500: ErrorResponse,
        },
    },
};

// --- Handler Types ---
export type RefreshHandler = RouteHandler<{
    Body: RefreshBodyType;
    Reply: StandardReply<RefreshSuccessResponseType>;
}>;
