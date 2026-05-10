import type { FastifyInstance } from "fastify";
import { User } from "@models/User";
import { Types } from "mongoose";

export const issueAccessToken = (user: User, sessionId: Types.ObjectId, jwt: Pick<FastifyInstance, "jwt">["jwt"]) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            sid: sessionId.toString(),
            role: user.role,
            email_verified: user.email_verified,
            username: user.username,
            ...(user.email && { email: user.email }),
            ...(user.avatar && { avatar: user.avatar }),
        },
        {
            expiresIn: "30m",
        },
    );
};
