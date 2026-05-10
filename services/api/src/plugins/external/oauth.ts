import oauth from "@fastify/oauth2";

const requiredEnv = ["TWITCH_CLIENT_ID", "TWITCH_CLIENT_SECRET", "TWITCH_CALLBACK_URL"];

for (const env of requiredEnv) {
    if (!process.env[env]) {
        console.error(`[OAuth Plugin] Missing: ${env}`);
        process.exit(1);
    }
}

export const autoConfig = {
    name: "twitchOAuth2",
    scope: ["user:read:email"],
    credentials: {
        client: {
            id: process.env.TWITCH_CLIENT_ID,
            secret: process.env.TWITCH_CLIENT_SECRET,
        },
        auth: oauth.TWITCH_CONFIGURATION,
    },
    startRedirectPath: "/v1/oauth/twitch",
    callbackUri: process.env.TWITCH_CALLBACK_URL,
};

export default oauth;
