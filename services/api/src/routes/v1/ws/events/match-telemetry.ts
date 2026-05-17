import { WebsocketEventFn } from "../schema";

interface TelemetryPayload {
    name: string;
    payload: any;
}

export const matchTelemetry: WebsocketEventFn<TelemetryPayload> = async (socket, request, data) => {
    const { type } = request.query;

    console.log(`Processing telemetry from ${type}:`, data);
};
