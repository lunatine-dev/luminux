import { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.get(
        "/",
        { websocket: true, schema: Schemas.Websocket, preValidation: handlers.preValidation },
        handlers.websocket,
    );
};

export default routes;
