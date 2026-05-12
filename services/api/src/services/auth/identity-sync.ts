import { UserModel } from "@models/User";

export const syncOAuthUser = async (params: {
    provider: "twitch";
    providerId: string;
    email?: string;
    profileData: any;
    refreshToken?: string;
    avatar?: string;
    username?: string;
}) => {
    const providerKey = `connections.${params.provider}`;

    return UserModel.findOneAndUpdate(
        { [`${providerKey}.id`]: params.providerId },
        {
            $set: {
                [`${providerKey}.profile`]: params.profileData,
                [`${providerKey}.refreshToken`]: params.refreshToken,
                [`${providerKey}.lastSync`]: new Date(),
                lastLogin: new Date(),
            },
            $setOnInsert: {
                ...(params.avatar && { avatar: params.avatar }),
                ...(params.username && { username: params.username }),
                ...(params.email && { email: params.email.toLowerCase() }),
                ...(params.provider === "twitch" && params.email && { email_verified: true }),
            },
        },
        { upsert: true, returnDocument: "after", setDefaultOnInsert: true, runValidators: true },
    );
};
