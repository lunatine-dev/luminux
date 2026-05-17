import type { FastifyPluginAsync, FastifySchema } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Schemas, TokenRegenerateBodyType, TokenRegenerateResponseType } from "./schema";
import { handlers } from "./handler";
import { isAuthenticated } from "../../../middleware/auth";
import { StandardReply } from "@defs/http";

const routes: FastifyPluginAsync = async (fastify) => {
    const api = fastify.withTypeProvider<TypeBoxTypeProvider>();

    api.get(
        "/@me",
        {
            onRequest: isAuthenticated,
            schema: Schemas.LocalUser,
        },
        handlers.getLocalUser,
    );

    api.get(
        "/@me/tokens",
        {
            onRequest: isAuthenticated,
            schema: Schemas.Tokens,
        },
        handlers.getLocalUserTokens,
    );

    api.post<{
        Body: TokenRegenerateBodyType;
        Reply: StandardReply<TokenRegenerateResponseType>;
    }>(
        "/@me/tokens/regenerate",
        { onRequest: isAuthenticated, schema: Schemas.TokenRegenerate },
        handlers.regenerateToken,
    );
};

export default routes;
