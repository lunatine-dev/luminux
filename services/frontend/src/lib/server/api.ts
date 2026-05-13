import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { error, redirect, type RequestEvent } from "@sveltejs/kit";

async function request<T>(event: RequestEvent, method: string, path: string, body?: unknown): Promise<T> {
    const token = event.cookies.get("accessToken");

    const res = await event.fetch(`${PUBLIC_BACKEND_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (res.status === 401) {
        event.cookies.delete("accessToken", { path: "/" });
        event.cookies.delete("refreshToken", { path: "/" });
        throw redirect(303, "/login");
    }

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw error(res.status as any, errData.message || "Backend Error");
    }

    return (res.status === 204 ? null : await res.json()) as T;
}

export const api = {
    get: <T>(e: RequestEvent, p: string) => request<T>(e, "GET", p),
    post: <T>(e: RequestEvent, p: string, b: unknown) => request<T>(e, "POST", p, b),
    put: <T>(e: RequestEvent, p: string, b: unknown) => request<T>(e, "PUT", p, b),
    delete: <T>(e: RequestEvent, p: string) => request<T>(e, "DELETE", p),
};
