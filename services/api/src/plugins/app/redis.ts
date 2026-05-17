import fp from "fastify-plugin";
import Redis from "ioredis";

declare module "fastify" {
    interface FastifyInstance {
        redis: Redis;
        redisSub: Redis;
    }
}

export default fp(async (fastify) => {
    // Shared connection options
    const redisOptions = {
        connectTimeout: 5000,
        maxRetriesPerRequest: 3,
        family: 4, // Force IPv4
    };

    const redis = new Redis(process.env.REDIS_URI!, redisOptions); // Setter

    const redisSub = new Redis(process.env.REDIS_URI!, redisOptions); // Listener

    const waitForReady = (client: Redis, name: string) => {
        return new Promise((resolve, reject) => {
            client.once("ready", () => {
                fastify.log.info(`Redis [${name}] Connected`);
                resolve(true);
            });

            client.once("error", (err) => {
                fastify.log.error(`Redis [${name}] failed to connect during startup`);
                reject(err);
            });
        });
    };

    try {
        await Promise.all([waitForReady(redis, "Main"), waitForReady(redisSub, "Subscriber")]);
    } catch (err) {
        await redis.quit().catch(() => {});
        await redisSub.quit().catch(() => {});
        throw err;
    }

    fastify.decorate("redis", redis);
    fastify.decorate("redisSub", redisSub);

    fastify.addHook("onClose", async (instance) => {
        await Promise.all([instance.redis.quit(), instance.redisSub.quit()]);
        fastify.log.info("All Redis connections disconnected");
    });
});
