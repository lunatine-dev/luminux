import type { FastifyRequest, FastifyReply } from "fastify";
import { TicketBodyType } from "./schema";

import { consumeTicket } from "@services/auth/ticket-manager";

export const handlers = {
    consume: async (request: FastifyRequest<{ Body: TicketBodyType }>, reply: FastifyReply) => {
        const { ticket } = request.body;

        const payload = await consumeTicket(request.server, ticket);

        if (!payload) {
            return reply.unauthorized("The ticket is invalid, expired, or has already been used.");
        }

        return payload;
    },
};
