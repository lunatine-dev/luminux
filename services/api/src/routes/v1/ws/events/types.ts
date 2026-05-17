import { WebsocketEventFn } from "@routes/v1/ws/schema";

export type AllowedSource = "DASHBOARD" | "OVERLAY" | "OVERWOLF";

export interface GameEventRegistry {
    allowedSources: AllowedSource[];
    events: Record<string, WebsocketEventFn>;
}
