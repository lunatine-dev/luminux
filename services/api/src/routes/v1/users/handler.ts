import { LocalUserHandler, TokenHandler, TokenRegenerateHandler } from "./schema";
import { UserModel } from "@models/User";
import { generateAPIToken } from "@services/api-tokens";

export const handlers = {
    getLocalUser: (async (request, reply) => {
        const user = request.userDoc;

        return {
            username: user.username,
            email: user.email ?? "",
            email_verified: user.email_verified,
            role: user.role,
            avatar: user.avatar ?? undefined,
            subscription: user.subscriptionStatus,
        };
    }) satisfies LocalUserHandler,

    getLocalUserTokens: (async (request, reply) => {
        const userId = request.userDoc._id;

        const user = await UserModel.findById(userId).select("+apiKeys.overwolf +apiKeys.overlay");

        if (!user || !user.apiKeys) throw reply.notFound("User not found");

        return {
            overwolf: user.apiKeys.overwolf,
            overlay: user.apiKeys.overlay,
        };
    }) satisfies TokenHandler,

    regenerateToken: (async (request, reply) => {
        const userId = request.userDoc._id;

        const { target } = request.body;
        // if (!target || !["overwolf", "overlay"].includes(target)) throw reply.badRequest("Invalid key target");

        const appCode = target === "overwolf" ? "ow" : "ovl";
        const newKey = generateAPIToken(appCode);

        const dbField = target === "overwolf" ? "apiKeys.overwolf" : "apiKeys.overlay";
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { [dbField]: newKey } },
            { returnDocument: "after" },
        );

        if (!updatedUser) throw reply.internalServerError("Failed to regenerate token");

        // TODO: Disconnect any socket connected with this key via redis pub/sub

        return {
            success: true,
            key: newKey,
        };
    }) satisfies TokenRegenerateHandler,
};

export const regenerateToken: TokenRegenerateHandler = async (request, reply) => {
    // request.body.target is perfectly inferred here!
    const { target } = request.body;

    // request.userDoc is cleanly provided by your global .d.ts
    const userId = request.userDoc._id;

    const appCode = target === "overwolf" ? "ow" : "ovl";
    const newKey = generateAPIToken(appCode);

    const dbField = target === "overwolf" ? "apiKeys.overwolf" : "apiKeys.overlay";
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { [dbField]: newKey } },
        { returnDocument: "after" },
    );

    if (!updatedUser) throw reply.internalServerError("Failed to regenerate token");

    return {
        success: true,
        key: newKey,
    };
};
