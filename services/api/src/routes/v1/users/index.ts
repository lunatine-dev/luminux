import type { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";
import { isAuthenticated } from "../../../middleware/auth";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.get(
        "/@me",
        {
            onRequest: isAuthenticated,
            schema: Schemas.LocalUser,
        },
        handlers.getLocalUser,
    );
};

export default routes;
