import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(async (fastify) => {
    mongoose.connection.on("connected", () => fastify.log.info("Connected to MongoDB"));
    mongoose.connection.on("error", (err) => fastify.log.error(err, "MongoDB Error"));

    await mongoose.connect(process.env.MONGO_URI);

    fastify.decorate("mongoose", mongoose.connection);

    fastify.addHook("onClose", async () => {
        await mongoose.disconnect();
        fastify.log.info("MongoDB Disconnected");
    });
});
