import { Type, Static } from "typebox";

export const ErrorResponse = Type.Object(
    {
        statusCode: Type.Number(),
        error: Type.String(),
        message: Type.String(),
    },
    {
        $id: "ErrorResponse",
        description: "Standard Error Response",
        examples: [
            {
                statusCode: 500,
                error: "Internal Server Error",
                message: "There was an error processing your request",
            },
        ],
    },
);
export type ErrorResponseType = Static<typeof ErrorResponse>;

export const RedirectResponse = Type.Null();
export type RedirectResponseType = Static<typeof RedirectResponse>;

export type StandardReply<T> = T | ErrorResponseType;
