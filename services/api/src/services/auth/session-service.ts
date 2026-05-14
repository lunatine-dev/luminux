import crypto from "node:crypto";
import { Types } from "mongoose";
import { SessionModel } from "@models/Session";
import { SESSION_EXPIRY_IN_DAYS } from "@constants/security";
import { AppError } from "@core/errors";

const hashToken = (raw: string) => crypto.createHash("sha256").update(raw).digest("hex");

export const issueRefreshToken = async (userId: Types.ObjectId, ip: string, userAgent: string) => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashToken(rawToken);

    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_IN_DAYS * 24 * 60 * 60 * 1000);

    const session = await SessionModel.create({
        userId,
        refreshToken: hashedToken,
        ipAddress: ip,
        userAgent,
        expiresAt,
    });

    return { rawToken, sessionId: session._id };
};

export const rotateSession = async (rawOldToken: string, ip: string, userAgent: string) => {
    const hashedOldToken = hashToken(rawOldToken);
    const newExpiresAt = new Date(Date.now() + SESSION_EXPIRY_IN_DAYS * 24 * 60 * 60 * 1000);
    const newRaw = crypto.randomBytes(32).toString("hex");
    const newHashed = hashToken(newRaw);

    const session = await SessionModel.findOneAndUpdate(
        {
            refreshToken: hashedOldToken,
            isValid: true,
            expiresAt: { $gt: new Date() },
        },
        {
            $set: {
                refreshToken: newHashed,
                oldTokenHash: hashedOldToken,
                ipAddress: ip,
                userAgent: userAgent,
                expiresAt: newExpiresAt,
            },
        },
        { returnDocument: "after" },
    );

    if (!session) {
        const historyCheck = await SessionModel.findOne({
            oldTokenHash: hashedOldToken,
        }).select("+oldTokenHash");

        if (historyCheck) {
            const GRACE_PERIOD_MS = 30000; // 30 seconds
            const timeSinceRotation = Date.now() - historyCheck.updatedAt.getTime();

            if (timeSinceRotation < GRACE_PERIOD_MS) {
                return { isGracePeriod: true, sessionId: historyCheck._id };
            }

            await SessionModel.updateMany({ userId: historyCheck.userId }, { isValid: false });
        }

        throw new AppError("Session could not be updated", 401);
    }

    return {
        newRefreshToken: newRaw,
        sessionId: session._id,
    };
};

export const getSessions = async (userId: Types.ObjectId) => {
    return SessionModel.find({
        isValid: true,
        userId,
        expiresAt: { $gt: new Date() },
    }).select("-refreshToken");
};

export const revokeSession = async (sessionId: string | Types.ObjectId) => {
    return SessionModel.findByIdAndUpdate(sessionId, { isValid: false });
};

export const revokeAllUserSessions = async (userId: Types.ObjectId) => {
    return SessionModel.updateMany({ userId }, { isValid: false });
};
