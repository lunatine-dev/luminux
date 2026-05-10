import type { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post(
        "/consume",
        {
            schema: Schemas.Consume,
        },
        handlers.consume,
    );
};

export default routes;
