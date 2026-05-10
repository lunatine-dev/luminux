import type { FastifySchema, RouteHandler } from "fastify";
import { Type, Static } from "typebox";
import { ErrorResponse, RedirectResponse, RedirectResponseType, StandardReply } from "@defs/http";
import { SWAGGER_TAGS } from "@constants/swagger-tags";

// --- Shared Body Definitions ---
export const LocalLoginBody = Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String(),
});
export const LocalSignUpBody = Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 8, maxLength: 100 }),
});

// --- Static Types for Handlers ---
export type LocalLoginBodyType = Static<typeof LocalLoginBody>;
export type LocalSignUpBodyType = Static<typeof LocalSignUpBody>;

// --- Schemas ---
export const Schemas = {
    Login: {
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Login with email and password",
        body: LocalLoginBody,
        response: {
            302: RedirectResponse,
            400: ErrorResponse,
            401: ErrorResponse,
            403: ErrorResponse,
            429: ErrorResponse,
            500: ErrorResponse,
        },
    } satisfies FastifySchema,

    SignUp: {
        tags: [SWAGGER_TAGS.AUTH],
        summary: "Register a new user account",
        body: LocalSignUpBody,
        response: {
            302: RedirectResponse,
            400: ErrorResponse,
            409: ErrorResponse,
            429: ErrorResponse,
            500: ErrorResponse,
        },
    } satisfies FastifySchema,
};

// --- Handler Types ---
export type LocalLoginHandler = RouteHandler<{
    Body: LocalLoginBodyType;
    Reply: StandardReply<RedirectResponseType>;
}>;

export type LocalSignUpHandler = RouteHandler<{
    Body: LocalSignUpBodyType;
    Reply: StandardReply<RedirectResponseType>;
}>;
