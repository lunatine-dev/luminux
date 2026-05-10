import type { FastifyPluginAsync } from "fastify";
import { Schemas } from "./schema";
import { handlers } from "./handler";

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post(
        "/login",
        {
            schema: Schemas.Login,
            config: {
                rateLimit: {
                    max: 3,
                    timeWindow: "1 minute",
                },
            },
        },
        handlers.login,
    );
    fastify.post(
        "/signup",
        {
            schema: Schemas.SignUp,
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: "1 hour",
                },
            },
        },
        handlers.signup,
    );
};

export default routes;
