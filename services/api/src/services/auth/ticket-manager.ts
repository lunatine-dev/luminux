import { FastifyInstance } from "fastify";
import { TICKET_EXPIRY_SECONDS, TICKET_PREFIX } from "@constants/security";

export const saveTicket = async (fastify: FastifyInstance, ticket: string, payload: object) => {
    await fastify.redis.set(`${TICKET_PREFIX}${ticket}`, JSON.stringify(payload), "EX", TICKET_EXPIRY_SECONDS);
};

export const consumeTicket = async (fastify: FastifyInstance, ticket: string) => {
    const key = `${TICKET_PREFIX}${ticket}`;

    const data = await fastify.redis.getdel(key);

    return data ? JSON.parse(data) : null;
};
