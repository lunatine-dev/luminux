import { AppError } from "@core/errors";
import { LocalUserHandler } from "./schema";

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
};
