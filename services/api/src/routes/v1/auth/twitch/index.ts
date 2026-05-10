import type { FastifyPluginAsync } from "fastify";
import { callbackSchema } from "./schema";
import { authHandlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.get("callback", { schema: callbackSchema }, authHandlers.callback);
};

export default routes;
