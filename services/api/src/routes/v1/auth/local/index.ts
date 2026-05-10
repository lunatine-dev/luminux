import type { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/login", { schema: Schemas.Login }, handlers.login);
};

export default routes;
