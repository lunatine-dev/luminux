import overwatch from "./overwatch";
import { GameEventRegistry } from "./types";

const gameRegistries: Record<string, GameEventRegistry> = {
    overwatch,
};

export const getEventHandler = (eventName: string) => {
    const [game] = eventName.split(":");
    const registry = gameRegistries[game];
    return registry?.events[eventName];
};

export const isEventAllowed = (eventName: string, source: string): boolean => {
    const [game] = eventName.split(":");
    const registry = gameRegistries[game];
    if (!registry) return false;
    return (registry.allowedSources as string[]).includes(source);
};
