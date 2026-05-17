import { WebsocketEventFn } from "@routes/v1/ws/schema";
import { PATTERNS } from "@subscriptions/patterns";
import { publishClusterTelemetry } from "../publisher";

export default (async (socket, request, data) => {
    const userId = request.socketUserId;
    if (!userId) return;

    try {
        request.log.info(`Match status log captured for user ${userId}. Processing backend state changes...`);
    } catch (err) {
        request.log.error(err, "Failed to update backend state logs for match_start");
    }

    await publishClusterTelemetry({
        socket,
        request,
        channelPattern: PATTERNS.overwatch,
        userId,
        eventName: "overwatch:match_status",
        payload: data,
    });
}) satisfies WebsocketEventFn;
