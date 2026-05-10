export type Env = {
    // db
    MONGO_URI: string;
    REDIS_URI: string;
    DEVELOPER_EMAIL: string;

    // http
    PORT: number;
    RATE_LIMIT_MAX: number;

    // security
    ENCRYPTION_KEY: string;

    // twitch provider
    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;
    TWITCH_CALLBACK_URL: string;
};

declare namespace NodeJS {
    interface ProcessEnv extends Env {}
}
