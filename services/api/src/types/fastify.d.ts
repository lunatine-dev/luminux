import { User } from "@models/User";
import { Session } from "@models/Session";

import { Redis } from "ioredis";
import { Connection } from "mongoose";

import { Env } from "./env";
import { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
    interface FastifyInstance {
        redis: Redis;
        mongoose: Connection;
        config: Env;
        twitchOAuth2: OAuth2Namespace;
    }
    interface FastifyRequest {
        userDoc: User;
        sessionDoc: Session;
    }
}
