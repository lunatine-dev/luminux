// scripts/sockets.js
import { SOCKET_HOST } from "./constants.js";

// Track when the connection attempt started
let connectionStartTime = 0;

export function registerSockets(core) {
    if (!core.token) {
        console.warn("Socket registration aborted: No token available.");
        core.isConnecting = false;
        return null;
    }

    const wsUrl = new URL(SOCKET_HOST);
    wsUrl.searchParams.append("key", core.token);
    wsUrl.searchParams.append("type", "OVERWOLF");

    connectionStartTime = Date.now();
    const socket = new WebSocket(wsUrl.toString());

    socket.onopen = () => {
        core.isConnecting = false;
        core.isRunning = true;
        console.log("[BACKGROUND]: Luminux active and connected to server.");
    };

    socket.onmessage = (event) => {
        try {
            const payload = JSON.parse(event.data);
            core.onSocketMessage(payload);
        } catch (err) {
            console.error("[SOCKET]: Failed to parse inbound frame:", err);
        }
    };

    socket.onerror = (err) => {
        console.error("[SOCKET]: Connection pipeline error encountered.");
    };

    socket.onclose = (event) => {
        console.warn(`[SOCKET]: Connection terminated. Code: ${event.code}`);

        core.isConnecting = false;
        const wasRunning = core.isRunning;
        core.isRunning = false;

        const connectionDuration = Date.now() - connectionStartTime;

        if (connectionDuration < 2000) {
            console.error(
                "[SOCKET]: Connection rejected immediately on handshake. Suspected invalid token. Halting reconnection loop.",
            );
            return;
        }

        if (wasRunning) {
            console.log("[SOCKET]: Scheduling automatic link recovery in 3 seconds...");
            setTimeout(() => {
                if (core.token) core.start();
            }, 3000);
        }
    };

    return {
        rawSocket: socket,
        disconnect: () => {
            socket.close(1000, "Core requested disconnection");
        },
        sendEvent: (eventName, data) => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ eventName, data }));
            }
        },
    };
}
