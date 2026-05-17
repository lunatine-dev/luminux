import { WebsocketEventFn } from "@routes/v1/ws/schema";
import { PATTERNS } from "@subscriptions/patterns";

export default (async (socket, request, data) => {
    const userId = request.socketUserId;
    if (!userId) return;

    try {
        await request.server.redis.publish(
            PATTERNS.overwatch.replace("*", userId),
            JSON.stringify({
                eventName: "overwatch:killfeed",
                data,
            }),
        );

        socket.send(JSON.stringify({ success: true }));
    } catch (err) {
        request.log.error(err, "Failed to publish killfeed");
        socket.send(JSON.stringify({ error: "Failed to process killfeed" }));
    }
}) satisfies WebsocketEventFn;
