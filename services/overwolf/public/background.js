import { registerTray } from "./scripts/tray.js";
import { registerSockets } from "./scripts/sockets.js";
import { registerEvents } from "./scripts/game-events.js";
import { routeGameTelemetry } from "./scripts/games/index.js";

const log = (data, type = "background") => console.log(`[${type.toUpperCase()}]:`, data);

class LuminuxCore {
    constructor() {
        /** @type {string} */
        this.token = localStorage.getItem("luminux_api_token") || "";
        this.isRunning = false;
        this.socket = null;
        this.currentGameId = null;

        log("Initiating Luminux Core...");

        if (this.token) {
            this.start();
        } else {
            log("No token found. Requesting user input...");
            this.openSettings();
        }

        registerTray();
        registerEvents(this);
    }

    /**
     * Listeners
     */
    onGameEvent = (info, gameId) => {
        this.currentGameId = gameId;

        if (!this.socket || !this.isRunning) return;

        routeGameTelemetry(this.currentGameId, info, this.socket);
    };

    onSocketMessage = (data) => {
        log(`Processing Socket Signal: ${JSON.stringify(data)}`);
    };

    /**
     * UI Actions
     */
    openSettings = () => {
        overwolf.windows.obtainDeclaredWindow("main", (result) => {
            if (result.success) {
                overwolf.windows.restore(result.window.id);
                overwolf.windows.bringToFront(result.window.id, () => {});
            }
        });
    };

    /**
     * Core Lifecycle
     */
    updateToken = (newToken) => {
        log("Token updated. Synchronizing services...");
        this.token = newToken;
        localStorage.setItem("luminux_api_token", newToken);

        this.restart();
    };

    start = async () => {
        if (!this.token || this.isConnecting || this.isRunning) return;

        this.isConnecting = true;
        this.socket = registerSockets(this);
    };

    stop = () => {
        this.isConnecting = false;
        this.isRunning = false;
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        log("Luminux offline.");
    };

    restart = () => {
        this.stop();
        this.start();
    };
}

const luminux = new LuminuxCore();
window.luminux = luminux;

window.updateToken = (token) => luminux.updateToken(token);
window.openSettings = () => luminux.openSettings();
