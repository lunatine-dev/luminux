import { g_interestedInFeatures } from "./constants.js";

const isOverwatch = (id) => Math.floor(id / 10) === 10844;

export function registerEvents(core) {
    const onInfoUpdates2Listener = (info) => {
        core.onGameEvent({ type: "info_update", data: info });
    };

    const onNewEventsListener = (info) => {
        core.onGameEvent({ type: "event_fired", data: info });
    };

    const onErrorListener = (info) => {
        console.error("[GEP]: Error", info);
    };

    const setFeatures = () => {
        overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, (info) => {
            if (info.status === "error") {
                console.warn("[GEP]: Retrying features in 2s...", info.reason);
                window.setTimeout(setFeatures, 2000);
                return;
            }
            console.log("[GEP]: Features set successfully", info);
        });
    };

    const startGEP = () => {
        overwolf.games.events.onError.removeListener(onErrorListener);
        overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates2Listener);
        overwolf.games.events.onNewEvents.removeListener(onNewEventsListener);

        overwolf.games.events.onError.addListener(onErrorListener);
        overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates2Listener);
        overwolf.games.events.onNewEvents.addListener(onNewEventsListener);

        setFeatures();
    };

    overwolf.games.onGameInfoUpdated.addListener((res) => {
        if (res && res.gameInfo && isOverwatch(res.gameInfo.id)) {
            if (res.runningChanged || res.gameChanged) {
                if (res.gameInfo.isRunning) {
                    console.log("[GEP]: Overwatch Detected (Update)");
                    startGEP();
                }
            }
        }
    });

    overwolf.games.getRunningGameInfo((res) => {
        if (res && res.isRunning && isOverwatch(res.id)) {
            console.log("[GEP]: Overwatch Detected (Boot)");
            startGEP();
        }
    });
}
