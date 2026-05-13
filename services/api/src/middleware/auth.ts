import { FastifyReply, FastifyRequest } from "fastify";

import { Session, SessionModel } from "@models/Session";
import { User } from "@models/User";

export const isAuthenticated = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (e) {
        throw reply.unauthorized("Unauthorized");
    }

    const { sub: userId, sid: sessionId } = request.user as any;

    const session = await SessionModel.findOne({
        _id: sessionId,
        userId,
        isValid: true,
        expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!session || !session.userId) throw reply.unauthorized("Session expired or user not found");

    request.userDoc = session.userId as User;
    request.sessionDoc = session as Session;
};
