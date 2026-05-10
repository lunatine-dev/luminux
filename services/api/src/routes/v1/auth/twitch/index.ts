import type { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.get("/callback", { schema: Schemas.Callback }, handlers.callback);
};

export default routes;
