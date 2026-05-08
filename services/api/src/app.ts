import fastifyAutoload from "@fastify/autoload";
import env from "@fastify/env";
import { isDirectory } from "@utils/filesystem";

import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { TAG_METADATA } from "@constants/swagger-tags";

import path from "path";
import { FastifyError, FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";

const schema = {
    type: "object",
    required: ["MONGO_URI", "PORT"],
    properties: {
        RATE_LIMIT_MAX: {
            type: "number",
            default: 100,
        },
    },
};

const serviceApp: FastifyPluginAsync = async (fastify, opts) => {
    // Load environment variables and attach to fastify object
    await fastify.register(env, {
        confKey: "config",
        schema,
        data: process.env,
        dotenv: false, // We don't have environment files, they're injected at runtime
    });

    const pluginDirs = [
        path.join(__dirname, "plugins/external"), // Third party plugins (cors, helmet, etc.)
        path.join(__dirname, "plugins/app"), // Internal plugins (auth, etc.)
    ];
    for (const dir of pluginDirs) {
        if (await isDirectory(dir)) {
            // Always check if directory exists because autoload will throw if a directory is missing
            await fastify.register(fastifyAutoload, {
                dir,
                options: { ...opts },
            });
        }
    }

    // Load swagger
    await fastify.register(swagger, {
        refResolver: {
            buildLocalReference(json, baseUri, fragment, i) {
                // This mirrors the default behaviour
                // see: https://github.com/fastify/fastify-swagger/blob/1b53e376b4b752481643cf5a5655c284684383c3/lib/mode/dynamic.js#L17
                if (!json.title && json.$id) {
                    json.title = json.$id;
                }
                // Fallback if no $id is present
                if (!json.$id) {
                    return `def-${i}`;
                }

                return `${json.$id}`;
            },
        },
        openapi: {
            info: {
                title: "Aphelion API",
                version: "1.0.0",
            },
            servers: [
                {
                    url: process.env.BACKEND_URL || "http://localhost:" + process.env.PORT,
                },
            ],
            tags: TAG_METADATA,
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
        },
    });

    await fastify.register(swaggerUi, {
        routePrefix: "/docs",
    });

    // Load routes
    fastify.register(fastifyAutoload, {
        dir: path.join(__dirname, "routes"),
        autoHooks: true,
        routeParams: true,
        cascadeHooks: true,
        indexPattern: /.*index(\.js|\.cjs|\.ts)$/i,
        ignorePattern: /^((?!index).)*(\.js|\.ts)$/,
        autoHooksPattern: /.*hooks(\.js|\.cjs|\.ts)$/i,
        options: { ...opts },
    });

    fastify.setErrorHandler((err: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        fastify.log.error(
            {
                err,
                request: {
                    method: request.method,
                    url: request.url,
                    query: request.query,
                    params: request.params,
                },
            },
            err.message || "Unhandled error occurred",
        );

        const statusCode = err.statusCode ?? 500;
        reply.code(statusCode);

        return {
            statusCode,
            error: err.name || (statusCode >= 500 ? "Internal Server Error" : "Bad Request"),
            message: statusCode >= 500 ? "Internal Server Error" : err.message,
        };
    });

    fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
        request.log.warn(
            {
                request: {
                    method: request.method,
                    url: request.url,
                    query: request.query,
                    params: request.params,
                },
            },
            "Resource not found",
        );
        reply.code(404);
        return { message: "Not Found" };
    });
};

export default serviceApp;
