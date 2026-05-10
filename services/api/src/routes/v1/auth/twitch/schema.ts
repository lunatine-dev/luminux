import type { FastifySchema } from "fastify";
import { ErrorResponse } from "@defs/error";
import { Type, Static } from "typebox";

import { SWAGGER_TAGS } from "@constants/swagger-tags";

// Shared

// Schemas
/**
 * GET /twitch/callback
 */
export const CallbackQuery = Type.Object({
    code: Type.String(),
    state: Type.Optional(Type.String()),
});
export type CallbackQueryType = Static<typeof CallbackQuery>;
export const callbackSchema: FastifySchema = {
    querystring: CallbackQuery,
    response: {
        302: Type.Null(),
        400: ErrorResponse,
        500: ErrorResponse,
    },
    tags: [SWAGGER_TAGS.AUTH],
};
