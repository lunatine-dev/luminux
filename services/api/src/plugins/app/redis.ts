import fp from "fastify-plugin";
import Redis from "ioredis";

export default fp(async (fastify) => {
    const redis = new Redis(process.env.REDIS_URI, {
        connectTimeout: 5000,
        maxRetriesPerRequest: 3,
        family: 4, // Force IPv4
    });

    await new Promise((resolve, reject) => {
        redis.once("ready", () => {
            fastify.log.info("Connected to Redis");
            resolve(true);
        });

        redis.once("error", (err) => {
            fastify.log.error("Redis failed to connect during startup");
            reject(err); // Kill app if Redis fails to connect
        });
    });

    fastify.decorate("redis", redis);

    fastify.addHook("onClose", async (instance) => {
        await instance.redis.quit();
        fastify.log.info("Redis Disconnected");
    });
});
