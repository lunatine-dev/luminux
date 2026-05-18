import type { FastifyRequest } from "fastify";
import type { UwsWebSocket } from "../schema";

interface ClusterPublishOptions {
    socket: UwsWebSocket;
    request: FastifyRequest<any>;
    channelPattern: string;
    userId: string;
    eventName: string;
    payload: any;
}

export async function publishClusterTelemetry({
    socket,
    request,
    channelPattern,
    userId,
    eventName,
    payload,
}: ClusterPublishOptions): Promise<void> {
    const targetChannel = channelPattern.replace("*", userId);

    console.log({
        channelPattern,
        userId,
        eventName,
        payload,
        targetChannel,
    });
    try {
        await request.server.redis.publish(
            targetChannel,
            JSON.stringify({
                eventName,
                data: payload,
                timestamp: Date.now(),
            }),
        );

        socket.send(JSON.stringify({ success: true }));
    } catch (err) {
        request.log.error(err, `Failed to publish cluster telemetry event: ${eventName}`);
        socket.send(JSON.stringify({ error: `Failed to process pipeline event: ${eventName}` }));
    }
}
