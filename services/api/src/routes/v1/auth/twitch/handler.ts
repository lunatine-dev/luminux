import type { FastifyRequest, FastifyReply } from "fastify";
import { CallbackQueryType } from "./schema";

import crypto from "node:crypto";

import { AppError } from "@core/errors";
import { processTwitchAuth } from "@services/auth/providers/twitch";
import { issueAccessToken } from "@services/auth/access-token-service";
import { saveTicket } from "@services/auth/ticket-manager";

export const authHandlers = {
    callback: async (request: FastifyRequest<{ Querystring: CallbackQueryType }>, reply: FastifyReply) => {
        const { token } = await request.server.twitchOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

        try {
            const {
                dbUser,
                sessionId,
                refreshToken: localRefreshToken,
            } = await processTwitchAuth(
                token.access_token,
                token.refresh_token ?? "",
                request.ip,
                request.headers["user-agent"] ?? "Generic",
                request.log,
            );

            // Generate access token
            const localAccessToken = issueAccessToken(dbUser, sessionId, request.server.jwt);

            // Generate ticket
            const ticketName = crypto.randomUUID();
            await saveTicket(request.server, ticketName, {
                accessToken: localAccessToken,
                refreshToken: localRefreshToken,
            });

            return reply.redirect(`${process.env.ORIGIN_SERVER}/api/callback?ticket=${ticketName}`);
        } catch (err) {
            if (err instanceof AppError) {
                return reply.code(err.statusCode).send({
                    error: err.name,
                    message: err.message,
                });
            }

            request.log.error(err);
            return reply.internalServerError("Something went wrong");
        }
    },
};
