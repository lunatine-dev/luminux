import type { Handle } from "@sveltejs/kit";
import type { User } from "$lib/types/auth";

import { JWT_SECRET } from "$env/static/private";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

import jwt from "jsonwebtoken";
import { api } from "$lib/server/api";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.api = {
        get: <T>(path: string): Promise<T> => api.get<T>(event, path),
        post: <T>(path: string, body: unknown): Promise<T> => api.post<T>(event, path, body),
        put: <T>(path: string, body: unknown): Promise<T> => api.put<T>(event, path, body),
        delete: <T>(path: string): Promise<T> => api.delete<T>(event, path),
    };

    let accessToken = event.cookies.get("accessToken");
    const refreshToken = event.cookies.get("refreshToken");

    const clearAuth = () => {
        event.cookies.delete("accessToken", { path: "/" });
        event.cookies.delete("refreshToken", { path: "/" });
        event.locals.user = null;
    };

    if (accessToken) {
        try {
            event.locals.user = jwt.verify(accessToken, JWT_SECRET) as User;
            return resolve(event);
        } catch (err) {
            // Token expired
        }
    }

    if (refreshToken) {
        try {
            const res = await fetch(`${PUBLIC_BACKEND_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-forwarded-for": event.getClientAddress(),
                    "user-agent": event.request.headers.get("user-agent") ?? "Unknown",
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (res.ok) {
                const { accessToken: newAccess, refreshToken: newRefresh } = await res.json();
                const cookieOptions = { path: "/", httpOnly: true, secure: true, sameSite: "lax" } as const;

                event.cookies.set("accessToken", newAccess, { ...cookieOptions, maxAge: 60 * 15 });
                event.cookies.set("refreshToken", newRefresh, { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 });

                event.locals.user = jwt.verify(newAccess, JWT_SECRET) as User;

                const modifiedRequest = new Request(event.request, {
                    headers: new Headers(event.request.headers),
                }); // Update headers with new cookies

                const newCookieHeader = `accessToken=${newAccess}; refreshToken=${newRefresh}`;
                modifiedRequest.headers.set("cookie", newCookieHeader);

                return resolve({ ...event, request: modifiedRequest });
            } else {
                clearAuth();
            }
        } catch (err) {
            clearAuth();
        }
    }

    return resolve(event);
};
