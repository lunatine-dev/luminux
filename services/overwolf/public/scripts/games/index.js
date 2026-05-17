// scripts/games/index.js
import { formatOverwatchEvent, interestedFeatures as overwatchFeatures } from "./overwatch.js";

const GAME_FORMATTERS = {
    10844: { name: "Overwatch 2", prefix: "overwatch", format: formatOverwatchEvent, features: overwatchFeatures },
};

export function isGameSupported(gameId) {
    const baseGameId = Math.floor(gameId / 10);
    return Object.prototype.hasOwnProperty.call(GAME_FORMATTERS, baseGameId);
}

export function getGameName(gameId) {
    const baseGameId = Math.floor(gameId / 10);
    return GAME_FORMATTERS[baseGameId]?.name || "Unknown Game";
}

export function getGameFeatures(gameId) {
    const baseGameId = Math.floor(gameId / 10);
    return GAME_FORMATTERS[baseGameId]?.features || [];
}

export function routeGameTelemetry(gameId, rawData, socket) {
    if (!socket) return;

    const baseGameId = Math.floor(gameId / 10);
    const config = GAME_FORMATTERS[baseGameId];

    if (!config) return;

    config.format(rawData, (normalized) => {
        if (normalized) {
            const namespacedEvent = `${config.prefix}:${normalized.event}`;
            socket.sendEvent(namespacedEvent, normalized.payload);
        }
    });
}
