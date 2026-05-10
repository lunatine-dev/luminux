import { ConsumeHandler } from "./schema";

import { consumeTicket } from "@services/auth/ticket-manager";

export const handlers = {
    consume: (async (request, reply) => {
        const { ticket } = request.body;

        const payload = await consumeTicket(request.server, ticket);

        if (!payload) {
            return reply.unauthorized("The ticket is invalid, expired, or has already been used.");
        }

        return payload;
    }) satisfies ConsumeHandler,
};
