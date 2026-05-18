import { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    // @ts-ignore
    fastify.get("/", { websocket: true, schema: Schemas.Websocket }, handlers.websocket);
};

export default routes;
