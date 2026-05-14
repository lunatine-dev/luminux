import { AppError } from "@core/errors";

import mongoose from "mongoose";

import { SessionModel } from "@models/Session";
import { RefreshHandler } from "@routes/v1/auth/schema";
import { rotateSession } from "@services/auth/session-service";
import { issueAccessToken } from "@services/auth/access-token-service";

export const handlers = {
    refresh: (async (request, reply) => {
        const { refreshToken } = request.body;

        const realIp = (request.headers["x-forwarded-for"] as string) || request.ip;
        const realUserAgent = request.headers["user-agent"] ?? "Unknown";

        try {
            const result = await rotateSession(refreshToken, realIp, realUserAgent);
            if (!result.newRefreshToken) throw new AppError("Could not rotate session", 401);

            const session = await SessionModel.findById(result.sessionId).populate("userId");
            if (!session || !session.userId) throw new AppError("Could not find valid session", 401);

            if (typeof session.userId === "string" || session.userId instanceof mongoose.Types.ObjectId)
                throw new AppError("Something went wrong", 500);

            const accessToken = issueAccessToken(session.userId, result.sessionId, request.server.jwt);

            return { accessToken, refreshToken: result.newRefreshToken };
        } catch (err) {
            if (err instanceof AppError) {
                return reply.code(err.statusCode).send(err.serialize());
            }

            request.log.error(err);
            return reply.internalServerError("Something went wrong");
        }
    }) satisfies RefreshHandler,
};
