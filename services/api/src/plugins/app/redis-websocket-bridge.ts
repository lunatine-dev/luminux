// src/plugins/app/redis-websocket-bridge.ts
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { subscriptionRegistry } from "@services/websocket-subscriptions";
import { registerSubscriptions } from "@subscriptions/index";

export default fp(
    async (fastify: FastifyInstance) => {
        registerSubscriptions();

        fastify.addHook("onRoute", (routeOptions) => {
            if (routeOptions.websocket) {
                subscriptionRegistry.initialize(fastify);
            }
        });

        fastify.addHook("onReady", () => {
            subscriptionRegistry.initialize(fastify);
        });
    },
    {
        name: "redis-websocket-bridge",
    },
);
