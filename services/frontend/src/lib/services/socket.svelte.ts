import { page } from "$app/state";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { getContext } from "svelte";

export class SocketService {
    status = $state<"CONNECTING" | "CONNECTED" | "DISCONNECTED">("DISCONNECTED");

    private ws: WebSocket | null = null;
    private pageListeners = new Map<string, (data: any) => void>();
    private anyListener: ((eventName: string, data: any) => void) | null = null;
    private isAuthValid = true;

    connect() {
        if (this.ws || typeof window === "undefined") return;

        const token = page.data.token;
        if (!token) return;

        const wsUrl = new URL(`/v1/ws?type=DASHBOARD`, PUBLIC_BACKEND_URL.replace(/^http/, "ws")).href;

        this.ws = new WebSocket(wsUrl, token);
        this.status = "CONNECTING";

        this.ws.onopen = () => {
            this.status = "CONNECTED";
            console.log("[SOCKET]: Gateway connection successful");
        };
        this.ws.onmessage = (event) => {
            try {
                const { eventName, data } = JSON.parse(event.data);

                if (eventName === "auth_failure") {
                    console.error("[SOCKET]: Auth validation failed on backend:", data.message);
                    this.isAuthValid = false;
                    return;
                }

                if (this.anyListener) {
                    this.anyListener(eventName, data);
                }

                const activeListener = this.pageListeners.get(eventName);
                if (activeListener) {
                    activeListener(data);
                }
            } catch (err) {
                console.error("[SOCKET]: Error handling incoming gateway frame:", err);
            }
        };

        this.ws.onclose = (event) => {
            this.status = "DISCONNECTED";
            this.ws = null;
            console.log(event.code);
            if (event.code === 4001 || !this.isAuthValid) {
                console.warn("[SOCKET]: Hard stopping reconnect loops due to auth failure.");
                return;
            }
            setTimeout(() => this.connect(), 3000);
        };
    }

    on(event: string, callback: (data: any) => void) {
        this.pageListeners.set(event, callback);
        return () => this.pageListeners.delete(event);
    }

    onAny(callback: (eventName: string, data: any) => void) {
        this.anyListener = callback;
        // Returns the clean unmount function automatically
        return () => {
            this.anyListener = null;
        };
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export const SOCKET_KEY = Symbol("SOCKET_SERVICE");
export function useSocket() {
    const socket = getContext<SocketService>(SOCKET_KEY);
    if (!socket) {
        throw new Error("useSocket must be called inside a component tree under your dashboard layout.");
    }
    return socket;
}
