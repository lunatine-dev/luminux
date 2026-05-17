// src/routes/v1/ws/events/overwatch/index.ts
import { GameEventRegistry } from "../types";
import killfeed from "./killfeed";

export default {
    allowedSources: ["OVERWOLF"],
    events: {
        "overwatch:killfeed": killfeed,
    },
} satisfies GameEventRegistry;
