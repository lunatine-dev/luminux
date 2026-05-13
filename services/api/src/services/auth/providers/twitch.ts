import { TwitchUser } from "@defs/twitch";

import axios from "axios";
import { AppError } from "@core/errors";
import { issueRefreshToken } from "@services/auth/session-service";
import { syncOAuthUser } from "@services/auth/identity-sync";
import { encrypt } from "@services/encryption";

export const getUser = async (accessToken: string): Promise<TwitchUser> => {
    if (!accessToken) throw new Error("No access token provided");

    const { data } = await axios.get<{ data: TwitchUser[] }>("https://api.twitch.tv/helix/users", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
    });

    if (!data.data || data.data.length === 0) {
        throw new Error("Twitch user not found");
    }

    return data.data[0];
};

export const processTwitchAuth = async (
    twitchAccessToken: string,
    twitchRefreshToken: string,
    ip: string,
    ua: string,
) => {
    const user = await getUser(twitchAccessToken);
    if (!user) throw new AppError("User not found", 401);

    let encryptedRefreshToken: string;
    try {
        encryptedRefreshToken = encrypt(twitchRefreshToken);
    } catch (err) {
        throw new AppError("Failed to process Twitch login", 500);
    }

    const dbUser = await syncOAuthUser({
        provider: "twitch",
        providerId: String(user.id),
        email: user.email,
        profileData: {
            login: user.login,
            display_name: user.display_name,
            type: user.type,
            broadcaster_type: user.broadcaster_type,
            description: user.description,
            profile_image_url: user.profile_image_url,
            offline_image_url: user.offline_image_url,
            created_at: user.created_at,
        },
        refreshToken: encryptedRefreshToken,
        username: user.login,
        ...(user.profile_image_url && { avatar: user.profile_image_url }),
    });

    if (!dbUser) throw new AppError("Failed to synchronize user data", 500);

    const { rawToken, sessionId } = await issueRefreshToken(dbUser._id, ip, ua);

    return {
        dbUser,
        sessionId,
        refreshToken: rawToken,
    };
};
