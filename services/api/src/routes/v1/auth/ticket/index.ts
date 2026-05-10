import type { FastifyPluginAsync } from "fastify";
import { ticketSchema } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post(
        "/consume",
        {
            schema: ticketSchema,
        },
        handlers.consume,
    );
};

export default routes;
