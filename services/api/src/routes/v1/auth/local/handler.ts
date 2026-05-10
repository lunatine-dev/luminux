import { LocalLoginHandler, LocalSignUpHandler } from "./schema";

import crypto from "node:crypto";

import { AppError } from "@core/errors";
import { issueAccessToken } from "@services/auth/access-token-service";
import { saveTicket } from "@services/auth/ticket-manager";
import { processLocalAuth, processLocalOnboarding } from "@services/auth/providers/local";

export const handlers = {
    login: (async (request, reply) => {
        const { email, password } = request.body;

        try {
            const { dbUser, sessionId, refreshToken } = await processLocalAuth(
                email,
                password,
                request.ip,
                request.headers["user-agent"] ?? "Generic",
            );

            // Generate access token
            const accessToken = issueAccessToken(dbUser, sessionId, request.server.jwt);

            // Generate ticket
            const ticketName = crypto.randomUUID();
            await saveTicket(request.server, ticketName, {
                accessToken,
                refreshToken,
            });

            return reply.redirect(`${process.env.ORIGIN_SERVER}/api/callback?ticket=${ticketName}`);
        } catch (err) {
            if (err instanceof AppError) {
                return reply.code(err.statusCode).send(err.serialize());
            }

            request.log.error(err);
            return reply.internalServerError("Something went wrong");
        }
    }) satisfies LocalLoginHandler,
    signup: (async (request, reply) => {
        const { email, password } = request.body;

        const user = await processLocalOnboarding(email, password);

        // TODO: Email confirmation sent here

        return reply.redirect(`${process.env.ORIGIN_SERVER}/login?signup=success`);
    }) satisfies LocalSignUpHandler,
};
