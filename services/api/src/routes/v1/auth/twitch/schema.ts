import type { FastifySchema, RouteHandler } from "fastify";
import { Type, Static } from "typebox";
import { ErrorResponse, RedirectResponse, RedirectResponseType, StandardReply } from "@defs/http";
import { SWAGGER_TAGS } from "@constants/swagger-tags";

// --- Shared Definitions ---
export const TwitchCallbackQuery = Type.Object({
    code: Type.String({
        description: "The authorization code returned by Twitch",
    }),
    state: Type.String({
        description: "The state parameter to prevent CSRF",
    }),
});

// --- Static Types for Handlers ---
export type TwitchCallbackQueryType = Static<typeof TwitchCallbackQuery>;

// --- Schemas ---
export const Schemas = {
    Callback: {
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Twitch OAuth callback handler",
        description: "Exchanges the Twitch authorization code for a user session",
        querystring: TwitchCallbackQuery,
        response: {
            302: RedirectResponse,
            400: ErrorResponse,
            500: ErrorResponse,
        },
    } satisfies FastifySchema,
};

// --- Handler Types ---
export type TwitchCallbackHandler = RouteHandler<{
    Querystring: TwitchCallbackQueryType;
    Reply: StandardReply<RedirectResponseType>;
}>;
