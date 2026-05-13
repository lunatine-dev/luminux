import type { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/refresh", { schema: Schemas.Refresh }, handlers.refresh);
};

export default routes;
