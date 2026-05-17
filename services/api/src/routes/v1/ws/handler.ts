import { AppError } from "@core/errors";
import { RouteHandler } from "fastify";

import { WebsocketHandler, WebsocketValidationHandler, InboundFrame, WebsocketEventFn } from "@routes/v1/ws/schema";
import { matchTelemetry } from "./events/match-telemetry";

const eventRegistry: Record<string, WebsocketEventFn> = {
    "match:telemetry": matchTelemetry,
};

export const handlers = {
    websocket: (async (socket, request) => {
        const { type } = request.query;

        request.log.info(`New ${type} streaming pipeline initialized`);

        socket.on("message", async (rawData) => {
            try {
                const payload: InboundFrame = JSON.parse(rawData.toString());

                const { eventName, data } = payload;

                const handleEvent = eventRegistry[eventName];

                if (!handleEvent) {
                    request.log.warn(`Unregistered WS event type received: ${eventName}`);
                    socket.send(JSON.stringify({ error: `Unknown event: ${eventName}` }));
                    return;
                }

                await handleEvent(socket, request, data);
            } catch (err) {
                request.log.error(err, "Failed to parse incoming WS frame pipeline processing");
                socket.send(JSON.stringify({ error: "Malformed request payload context" }));
            }
        });

        socket.on("close", () => {
            request.log.info(`WebSocket tunnel closed for ${type}.`);
        });
    }) satisfies WebsocketHandler,

    preValidation: (async (request, reply) => {
        const { key } = request.query;

        if (key === "bad_key") {
            throw reply.unauthorized("Invalid key");
        }
    }) satisfies WebsocketValidationHandler,
};
