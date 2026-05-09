export type Env = {
    MONGO_URI: string;
    REDIS_URI: string;
    PORT?: number;
    RATE_LIMIT_MAX: number;

    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;
    TWITCH_CALLBACK_URL: string;
};

declare namespace NodeJS {
    interface ProcessEnv extends Env {}
}
