import fastifyRateLimit from "@fastify/rate-limit";
import { FastifyInstance, FastifyRequest } from "fastify";

export const autoConfig = (fastify: FastifyInstance) => {
    return {
        redis: fastify.redis,
        global: false,
        max: fastify.config.RATE_LIMIT_MAX || 100,
        timeWindow: "1 minute",

        errorResponseBuilder: (request: FastifyRequest, context: any) => {
            const time = context.after.toLowerCase();
            return {
                statusCode: 429,
                error: "Too Many Requests",
                message: `Slow down! Please try again in ${time}.`,
            };
        },
    };
};

export default fastifyRateLimit;
