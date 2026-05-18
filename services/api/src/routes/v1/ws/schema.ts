import type { FastifyReply, FastifyRequest, FastifySchema, RouteHandler } from "fastify";
import type { WebSocket } from "ws";
import { Type, Static } from "typebox";
import { ErrorResponse, ErrorResponseType, RedirectResponse, RedirectResponseType, StandardReply } from "@defs/http";
import { SWAGGER_TAGS } from "@constants/swagger-tags";

// --- Shared Body Definitions ---
export const WebsocketQuery = Type.Object({
    type: Type.Enum(["DASHBOARD", "OVERLAY", "OVERWOLF"]),
});
export const WebsocketResponse = Type.Object(
    {},
    {
        description: "Switching Protocols to WebSocket. Connection upgraded successfully.",
    },
);
export interface InboundFrame<T = any> {
    eventName: string;
    data: T;
}

// --- Static Types for Handlers ---
export type WebsocketQueryType = Static<typeof WebsocketQuery>;
export type WebsocketResponseType = Static<typeof WebsocketResponse>;

// --- Schemas ---
export const Schemas = {
    Websocket: {
        tags: [SWAGGER_TAGS.WS],
        summary: "Websocket Connection Handshake Gateway",
        description: "Initiates a persistent WebSocket connection. Requires switching protocols to WS/WSS.",
        querystring: WebsocketQuery,
        response: {
            401: ErrorResponse,
            400: ErrorResponse,
            101: WebsocketResponse,
        },
    } satisfies FastifySchema,
};

// --- Handler Types ---

export type WebsocketHandler = (
    socket: WebSocket,
    request: FastifyRequest<{ Querystring: WebsocketQueryType }> & { socketUserId?: string },
) => void | Promise<void>;

export type WebsocketEventFn<T = any> = (
    socket: WebSocket,
    request: FastifyRequest<{ Querystring: WebsocketQueryType }> & { socketUserId?: string },
    data: T,
) => void | Promise<void>;
