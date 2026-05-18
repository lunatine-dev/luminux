import { FastifyInstance } from "fastify";

export interface Subscription {
    pattern: string;
}

class WebSocketSubscriptionRegistry {
    private subscriptions: Map<string, Subscription> = new Map();
    private initialized = false;

    register(key: string, pattern: string) {
        this.subscriptions.set(key, { pattern });
    }

    getPatterns(): string[] {
        return Array.from(this.subscriptions.values()).map((s) => s.pattern);
    }

    async initialize(fastify: FastifyInstance) {
        if (this.initialized) return;
        this.initialized = true;

        const patterns = this.getPatterns();
        fastify.log.info(`Initializing ${patterns.length} WebSocket subscriptions`);

        for (const pattern of patterns) {
            fastify.redisSub.psubscribe(pattern, (err) => {
                if (err) {
                    fastify.log.error(err, `Failed to subscribe to: ${pattern}`);
                } else {
                    fastify.log.debug(`Subscribed to: ${pattern}`);
                }
            });
        }

        fastify.redisSub.on("pmessage", (pattern: string, channel: string, message: string) => {
            try {
                fastify.uws.publish(channel, message);
            } catch (err) {
                fastify.log.error(err, `Failed to publish to channel: ${channel}`);
            }
        });

        fastify.redisSub.on("error", (err) => {
            fastify.log.error(err, "Redis subscriber error");
        });
    }
}

export const subscriptionRegistry = new WebSocketSubscriptionRegistry();
