import { io } from "./socket.io.esm.min.js";
import { SOCKET_HOST } from "./constants.js";

export function registerSockets(core) {
    if (!core.token) {
        console.warn("Socket registration aborted: No token available.");
        return null;
    }

    const socket = io(SOCKET_HOST, {
        auth: {
            token: core.token,
        },
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    });

    socket.on("connect", () => {
        console.log("Socket.io connected to Luminux");
    });

    socket.on("session_update", (data) => {
        core.onSocketMessage(data);
    });

    socket.on("connect_error", (err) => {
        console.error("Connection failed:", err.message);
    });

    return socket;
}
