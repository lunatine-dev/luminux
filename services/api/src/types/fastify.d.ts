import { Redis } from "ioredis";
import { Connection } from "mongoose";

import { Env } from "./env";

declare module "fastify" {
    interface FastifyInstance {
        redis: Redis;
        mongoose: Connection;
        config: Env;
    }
}
