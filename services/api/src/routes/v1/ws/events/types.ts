import { WebsocketEventFn } from "@routes/v1/ws/schema";

export type AllowedSource = "DASHBOARD" | "OVERLAY" | "OVERWOLF";

export interface GameModuleConfig {
    allowedSources: AllowedSource[];
    passThroughEvents: string[];
    customEvents?: Record<string, WebsocketEventFn>;
}
