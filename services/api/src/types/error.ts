import { Type, Static } from "typebox";

export const ErrorResponse = Type.Object({
    statusCode: Type.Number(),
    error: Type.String(),
    message: Type.String(),
});
export type ErrorResponseType = Static<typeof ErrorResponse>;
