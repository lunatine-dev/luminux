import type { FastifySchema, RouteHandler } from "fastify";
import { Type, Static } from "typebox";
import { ErrorResponse, ErrorResponseType, StandardReply } from "@defs/http";
import { SWAGGER_TAGS } from "@constants/swagger-tags";

// --- Shared Definitions ---
export const TicketBody = Type.Object({
    ticket: Type.String({
        format: "uuid",
        description: "The temporary exchange ticket",
    }),
});

export const TicketSuccessResponse = Type.Object({
    accessToken: Type.String(),
    refreshToken: Type.String(),
});

// --- Static Types for Handlers ---
export type TicketBodyType = Static<typeof TicketBody>;
export type TicketSuccessResponseType = Static<typeof TicketSuccessResponse>;

// --- Schemas ---
export const Schemas = {
    Consume: {
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Exchange a ticket for authentication tokens",
        body: TicketBody,
        response: {
            200: TicketSuccessResponse,
            400: ErrorResponse,
            401: ErrorResponse,
            500: ErrorResponse,
        },
    } satisfies FastifySchema,
};

// --- Handler Types ---
export type ConsumeHandler = RouteHandler<{
    Body: TicketBodyType;
    Reply: StandardReply<TicketSuccessResponseType>;
}>;
