import { subscriptionRegistry } from "@services/websocket-subscriptions";
import { PATTERNS } from "@subscriptions/patterns";

export const registerSubscriptions = () => {
    subscriptionRegistry.register("overwatch-telemetry", PATTERNS.overwatch);
};
