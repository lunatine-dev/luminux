import { InboundFrame, WebsocketHandler, WebsocketValidationHandler } from "@routes/v1/ws/schema";
import { API_KEY_PREFIX } from "@constants/security";
import { PATTERNS } from "@subscriptions/patterns";
import { getEventHandler, isEventAllowed } from "./events";

const getSubscriptionTopics = (userId: string, type: string): string[] => {
    const topics: string[] = [];

    topics.push(PATTERNS.overwatch.replace("*", userId));

    return topics;
};

const extractUserIdFromKey = async (key: string, type: string): Promise<string> => {
    if (type === "OVERLAY" && key.startsWith(`${API_KEY_PREFIX}_ovl`)) {
    }
    if (type === "OVERWOLF" && key.startsWith(`${API_KEY_PREFIX}_ow`)) {
    }
    if (type === "DASHBOARD") {
    }

    throw new Error("Invalid key format");
};

export const handlers = {
    websocket: (async (socket, request) => {
        const { type } = request.query;
        const userId = request.socketUserId;

        if (!userId) {
            socket.send(JSON.stringify({ error: "Failed to authenticate user" }));
            socket.close();
            return;
        }

        request.log.info(`New ${type} streaming pipeline initialized`);

        const topics = getSubscriptionTopics(userId, type);
        topics.forEach((topic) => socket.subscribe(topic));

        socket.on("message", async (rawData) => {
            try {
                const payload: InboundFrame = JSON.parse(rawData.toString());
                const { eventName, data } = payload;

                if (!isEventAllowed(eventName, type)) {
                    request.log.warn(`${type} not allowed to send ${eventName}`);
                    socket.send(
                        JSON.stringify({
                            error: `${type} cannot send ${eventName}`,
                        }),
                    );
                    return;
                }

                const handleEvent = getEventHandler(eventName);

                if (!handleEvent) {
                    request.log.warn(`Unregistered event: ${eventName}`);
                    socket.send(JSON.stringify({ error: `Unknown event: ${eventName}` }));
                    return;
                }

                await handleEvent(socket, request, data);
            } catch (err) {
                request.log.error(err, "Failed to parse incoming WS frame");
                socket.send(JSON.stringify({ error: "Malformed request payload" }));
            }
        });

        socket.on("close", () => {
            socket.unsubscribe(PATTERNS.overwatch.replace("*", userId));
            request.log.info(`WebSocket tunnel closed for ${type}.`);
        });
    }) satisfies WebsocketHandler,

    preValidation: (async (request, reply) => {
        const { key, type } = request.query;

        try {
            (request as any).socketUserId = await extractUserIdFromKey(key, type);
        } catch (err) {
            request.log.warn(`Authentication failed for key: ${key}`);
            throw reply.unauthorized("Invalid authentication key");
        }
    }) satisfies WebsocketValidationHandler,
};
