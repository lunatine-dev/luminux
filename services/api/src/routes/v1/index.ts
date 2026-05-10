import { Type, Static } from "typebox";
import { FastifyPluginAsync } from "fastify";

import { SWAGGER_TAGS } from "@constants/swagger-tags";

export const PingResponseSchema = Type.Object(
    {
        message: Type.String({ examples: ["Pong!"] }),
        timestamp: Type.Number(),
        rnd: Type.Number(),
    },
    { $id: "PingResponse" },
);

type PingResponse = Static<typeof PingResponseSchema>;

const route: FastifyPluginAsync = async (fastify) => {
    fastify.get<{ Reply: PingResponse }>(
        "/ping",
        {
            schema: {
                tags: [SWAGGER_TAGS.SYSTEM],
                summary: "Health check",
                response: {
                    200: PingResponseSchema,
                },
            },
        },
        async () => {
            return {
                message: "Pong!",
                timestamp: Date.now(),
                rnd: Math.random(),
            };
        },
    );
};

export default route;
