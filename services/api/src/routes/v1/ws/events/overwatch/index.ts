import { GameModuleConfig } from "../types";
import matchStatus from "./matchStatus";

export default {
    allowedSources: ["OVERWOLF"],
    passThroughEvents: ["overwatch:killfeed"],
    customEvents: {
        "overwatch:match_status": matchStatus,
    },
} satisfies GameModuleConfig;
