import { InboundFrame, WebsocketHandler } from "@routes/v1/ws/schema";
import { API_KEY_PREFIX } from "@constants/security";
import { getEventHandler, getUserSubscriptionTopics, isEventAllowed } from "./events";
import { UserModel } from "@models/User";
import { FastifyInstance } from "fastify";

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
}

const extractUserIdFromKey = async (
    key: string,
    type: "OVERLAY" | "OVERWOLF" | "DASHBOARD",
    fastify: FastifyInstance,
): Promise<string> => {
    if (type === "OVERLAY" && key.startsWith(`${API_KEY_PREFIX}_ovl`)) {
        const user = await UserModel.findOne({
            "apiKeys.overlay": key,
        });

        if (!user) throw new Error("Invalid key");
        return String(user._id);
    }

    if (type === "OVERWOLF" && key.startsWith(`${API_KEY_PREFIX}_ow`)) {
        const user = await UserModel.findOne({
            "apiKeys.overwolf": key,
        });

        if (!user) throw new Error("Invalid key");
        return String(user._id);
    }

    if (type === "DASHBOARD") {
        try {
            const decoded = fastify.jwt.verify<JwtPayload>(key);

            if (!decoded || !decoded.sub) {
                throw new Error("Token payload missing subject claim");
            }

            return decoded.sub;
        } catch (err) {
            throw new Error("Invalid or expired dashboard session token");
        }
    }

    throw new Error("Invalid key format or unrecognized credential type");
};

export const handlers = {
    websocket: (async (socket, request) => {
        const { type } = request.query;
        let userId: string | null = null;

        try {
            const key = request.headers["sec-websocket-protocol"];
            if (!key) throw new Error("Invalid key");
            userId = await extractUserIdFromKey(key, type, request.server);
        } catch (err) {
            request.log.warn(`Authentication failed`);
            socket.send(
                JSON.stringify({
                    eventName: "auth_failure",
                    data: { message: "Session token expired or invalid." },
                }),
            );
            setTimeout(() => {
                try {
                    socket.close(4001);
                } catch (closeErr) {}
            }, 100);
            return;
        }

        if (!userId) return; // Never to sure

        const rawSocket = (socket as any).connection;
        request.socketUserId = userId;

        request.log.info(`New ${type} streaming pipeline initialized for ${userId}`);

        const topics = getUserSubscriptionTopics(userId, type);
        if (rawSocket && typeof rawSocket.subscribe === "function") {
            topics.forEach((topic) => {
                rawSocket.subscribe(topic);
            });
            request.log.info(`[uWS]: Native topic subscriptions initialized for user: ${userId}`);
        } else {
            request.log.error("[uWS]: Critical - Could not access underlying uWS connection object.");
        }

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
                console.log("Event name is ", eventName);

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
            request.log.info(`WebSocket tunnel closed for ${type}.`);
        });
    }) satisfies WebsocketHandler,
};
