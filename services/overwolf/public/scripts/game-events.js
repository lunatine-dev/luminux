import { isGameSupported, getGameName, getGameFeatures } from "./games/index.js";

export function registerEvents(core) {
    let activeInfoListener = null;
    let activeEventListener = null;

    const onErrorListener = (info) => {
        console.error("[GEP]: Error encountered:", info);
    };

    const setFeatures = (features) => {
        if (!features || features.length === 0) {
            console.warn("[GEP]: Aborting registration, empty feature list provided.");
            return;
        }

        overwolf.games.events.setRequiredFeatures(features, (info) => {
            if (info.status === "error") {
                console.warn("[GEP]: Retrying feature configuration in 2s...", info.reason);
                window.setTimeout(() => setFeatures(features), 2000);
                return;
            }
            console.log("[GEP]: Game features registered successfully:", info);
        });
    };

    const startGEP = (gameId) => {
        // 1. Clean up old handles explicitly
        overwolf.games.events.onError.removeListener(onErrorListener);
        if (activeInfoListener) overwolf.games.events.onInfoUpdates2.removeListener(activeInfoListener);
        if (activeEventListener) overwolf.games.events.onNewEvents.removeListener(activeEventListener);

        activeInfoListener = (info) => {
            core.onGameEvent({ type: "info_update", data: info }, gameId);
        };

        activeEventListener = (info) => {
            core.onGameEvent({ type: "event_fired", data: info }, gameId);
        };

        overwolf.games.events.onError.addListener(onErrorListener);
        overwolf.games.events.onInfoUpdates2.addListener(activeInfoListener);
        overwolf.games.events.onNewEvents.addListener(activeEventListener);

        const features = getGameFeatures(gameId);
        setFeatures(features);
    };

    // Game lifecycle orchestrators
    overwolf.games.onGameInfoUpdated.addListener((res) => {
        if (res && res.gameInfo && isGameSupported(res.gameInfo.id)) {
            if (res.runningChanged || res.gameChanged) {
                if (res.gameInfo.isRunning) {
                    console.log(`[GEP]: Supported Game Detected (${getGameName(res.gameInfo.id)})`);
                    startGEP(res.gameInfo.id);
                }
            }
        }
    });

    overwolf.games.getRunningGameInfo((res) => {
        if (res && res.isRunning && isGameSupported(res.id)) {
            console.log(`[GEP]: Supported Game Detected on Boot (${getGameName(res.id)})`);
            startGEP(res.id);
        }
    });
}
