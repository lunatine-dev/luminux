import { GameModuleConfig } from "./types";
import { WebsocketEventFn } from "@routes/v1/ws/schema";

import { PATTERNS } from "@subscriptions/patterns";
import { publishClusterTelemetry } from "./publisher";

// Games
import overwatch from "./overwatch";

const gameRegistries: Record<string, GameModuleConfig> = {
    overwatch,
};

const patternMap: Record<string, string> = {
    overwatch: PATTERNS.overwatch,
};

export const getUserSubscriptionTopics = (userId: string, type: string): string[] => {
    const topics: string[] = [];

    if (type === "OVERLAY" || type === "DASHBOARD") {
        topics.push(PATTERNS.overwatch.replace("*", userId));
        console.log("Subscribed", topics);
    }

    return topics;
};

export const getEventHandler = (eventName: string): WebsocketEventFn | undefined => {
    const [game] = eventName.split(":");
    console.log(game, eventName);
    const registry = gameRegistries[game];
    if (!registry) return undefined;

    if (registry.customEvents && registry.customEvents[eventName]) {
        return registry.customEvents[eventName];
    }
    console.log(eventName, game);

    if (registry.passThroughEvents && registry.passThroughEvents.includes(eventName)) {
        return async (socket, request, data) => {
            const userId = request.socketUserId;
            if (!userId) return;

            await publishClusterTelemetry({
                socket,
                request,
                channelPattern: patternMap[game],
                userId,
                eventName,
                payload: data,
            });
        };
    }

    return undefined;
};

export const isEventAllowed = (eventName: string, source: string): boolean => {
    const [game] = eventName.split(":");
    const registry = gameRegistries[game];
    if (!registry) return false;
    return (registry.allowedSources as string[]).includes(source);
};
