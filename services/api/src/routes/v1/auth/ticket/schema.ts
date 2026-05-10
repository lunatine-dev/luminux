import type { FastifySchema, RouteHandler } from "fastify";
import { Type, Static } from "typebox";

import { ErrorResponse } from "@defs/error";

import { SWAGGER_TAGS } from "@constants/swagger-tags";

// --- Shared ---
export const TicketBody = Type.Object({
    ticket: Type.String({ format: "uuid" }),
});
const SuccessResponse = Type.Object({
    accessToken: Type.String(),
    refreshToken: Type.String(),
});

export type TicketBodyType = Static<typeof TicketBody>;
export type SuccessResponseType = Static<typeof SuccessResponse>;

// --- Schema ---
/**
 * POST /ticket/consume
 */
export const ticketSchema: FastifySchema = {
    body: TicketBody,
    response: {
        200: SuccessResponse,
        401: ErrorResponse,
    },
    tags: [SWAGGER_TAGS.AUTH],
};

// --- Handlers ---
export type ConsumeHandler = RouteHandler<{
    Body: TicketBodyType;
    Reply: SuccessResponseType | Static<typeof ErrorResponse>;
}>;
