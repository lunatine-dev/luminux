export const interestedFeatures = ["game_info", "match_info", "kill", "death", "roster"];

class OverwatchMatchTracker {
    constructor(onEventParsed) {
        this.onEventParsed = onEventParsed;
        this.activeRosterState = {};
        this.stateHasUpdates = false;

        this.heartbeatHandle = setInterval(() => {
            this.flushScoreboard();
        }, 2000);

        console.log("[LUMINUX]: Initialized active Overwatch Match Tracker.");
    }

    flushScoreboard() {
        if (this.stateHasUpdates && Object.keys(this.activeRosterState).length > 0) {
            this.onEventParsed({
                event: "scoreboard",
                payload: { players: this.activeRosterState },
            });
            this.stateHasUpdates = false;
        }
    }

    updateRosterSlot(slotId, freshPlayerData) {
        const historicalPlayerData = this.activeRosterState[slotId];

        if (
            historicalPlayerData &&
            freshPlayerData.hero_name === "UNKNOWN" &&
            historicalPlayerData.hero_name !== "UNKNOWN"
        ) {
            return;
        }

        if (freshPlayerData.hero_name) {
            const isInitialSpawn = !historicalPlayerData && freshPlayerData.hero_name !== "UNKNOWN";
            const isHeroChanged = historicalPlayerData && freshPlayerData.hero_name !== historicalPlayerData.hero_name;

            if (isInitialSpawn || isHeroChanged) {
                this.onEventParsed({
                    event: "hero_swap",
                    payload: {
                        slotId,
                        playerName:
                            freshPlayerData.player_name || historicalPlayerData?.player_name || "Unknown Player",
                        btag: freshPlayerData.battlenet_tag ?? "UNKNOWN",
                        oldHero: historicalPlayerData?.hero_name || "NONE",
                        newHero: freshPlayerData.hero_name,
                        isLocal: freshPlayerData.is_local ?? historicalPlayerData?.is_local ?? false,
                        team: freshPlayerData.team ?? historicalPlayerData?.team,
                    },
                });
            }
        }

        this.activeRosterState[slotId] = {
            ...historicalPlayerData,
            ...freshPlayerData,
            is_local: historicalPlayerData?.is_local || freshPlayerData.is_local || false,
        };
        this.stateHasUpdates = true;
    }

    destroy() {
        this.flushScoreboard();
        if (this.heartbeatHandle) {
            clearInterval(this.heartbeatHandle);
            this.heartbeatHandle = null;
        }
        this.activeRosterState = {};
        console.log("[LUMINUX]: Destroyed Overwatch Match Tracker. Clocks cleared.");
    }
}

let currentMatch = null;

export function formatOverwatchEvent(rawData, onEventParsed) {
    if (rawData.type === "info_update") {
        const { info, feature } = rawData?.data || {};

        if (feature === "roster") {
            if (!currentMatch) return;
            for (const [slotId, stringifiedPlayer] of Object.entries(info.roster)) {
                try {
                    const freshPlayerData = JSON.parse(stringifiedPlayer);
                    currentMatch.updateRosterSlot(slotId, freshPlayerData);
                } catch (e) {
                    console.error("[LUMINUX PARSER]: Failed parsing roster string:", e);
                }
            }
        } // hero change, damage dealt, healing dealt, deaths, kills, etc. (Scoreboard updates, very noisy)
        else if (feature === "game_info") {
            const { game_state, party_player_count, game_mode, battle_tag } = info?.game_info || {};
            const { game_type, game_queue_type } = info?.match_info || {};

            let matchedAny = false;

            if (game_state) {
                console.log("[DEBUG LOG][GAME STATE]:", game_state);
                matchedAny = true;
            }
            if (party_player_count) {
                console.log("[DEBUG LOG][PARTY COUNT]:", party_player_count);
                matchedAny = true;
            }
            if (game_mode) {
                console.log("[DEBUG LOG][GAME MODE]:", game_mode);
                matchedAny = true;
            }
            if (battle_tag) {
                console.log("[DEBUG LOG][BATTLE TAG]:", battle_tag);
                matchedAny = true;
            }
            if (game_type) {
                console.log("[DEBUG LOG][GAME TYPE]:", game_type);
                matchedAny = true;
            }
            if (game_queue_type) {
                console.log("[DEBUG LOG][QUEUE TYPE]:", game_queue_type);
                matchedAny = true;
            }

            if (!matchedAny) {
                console.log("[DEBUG LOG][UNKNOWN SHAPE]:", JSON.stringify(info, null, 2));
            }
        } else if (feature === "match_info") {
            // match_info logic
            const { map, pseudo_match_id, match_outcome } = info?.match_info || {};
            console.log({ map, pseudo_match_id, match_outcome });
        }
    }

    if (rawData.type === "event_fired") {
        for (const event of rawData.data.events) {
            const { name, data } = event || {};

            if (name === "kill_feed") {
            } else if (name === "match_start") {
                // data is null
                currentMatch = new OverwatchMatchTracker(onEventParsed);
            } else if (name === "match_end") {
                if (currentMatch) {
                    currentMatch.destroy();
                    currentMatch = null;
                }
                // data is null
            } else if (name === "round_start") {
                // data is null
            } else if (name === "round_end") {
                // data is null
            } else if (name === "respawn") {
                // data is null
            } else if (name === "revive") {
                // data is null
            } else if (name === "elimination") {
                // data is String (e.g '1')
                // number is total eliminations, best to rely on roster scoreboard information
            } else if (name === "death") {
                // data is String (e.g '1')
            } else if (name === "assist") {
                // data is String (e.g '1')
            }
        }
    }
}

export function resetOverwatchCache() {
    if (currentMatch) {
        currentMatch.destroy();
        currentMatch = null;
    }
}
