import { redirect, error } from "@sveltejs/kit";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export async function GET({ url, cookies }) {
    const ticket = url.searchParams.get("ticket");

    if (!ticket) throw error(400, "Bad Request");

    const res = await fetch(PUBLIC_BACKEND_URL + "/auth/ticket/consume", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticket }),
    });

    if (!res.ok) throw error(res.status, "Bad Request");

    const { accessToken, refreshToken } = await res.json();

    cookies.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 15,
    });
    cookies.set("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
    });

    throw redirect(303, "/");
}
