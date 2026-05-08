import { Redis } from "ioredis";
import { Connection } from "mongoose";

declare module "fastify" {
    interface FastifyInstance {
        redis: Redis;
        mongoose: Connection;
    }
}
