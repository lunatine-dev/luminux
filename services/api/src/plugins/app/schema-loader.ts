import fp from "fastify-plugin";
import { ErrorResponse } from "@defs/http";
import { LocalUserSuccessResponse } from "@routes/v1/users/schema";

export default fp(async (fastify) => {
    const schemas = [ErrorResponse, LocalUserSuccessResponse];

    for (const schema of schemas as any[]) {
        if (schema.$id && !fastify.getSchema(schema.$id)) {
            fastify.addSchema(schema);
        }
    }
});
