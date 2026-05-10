import fp from "fastify-plugin";
import { ErrorResponse } from "@defs/http";

export default fp(async (fastify) => {
    const schemas = [ErrorResponse];

    for (const schema of schemas as any[]) {
        if (schema.$id && !fastify.getSchema(schema.$id)) {
            fastify.addSchema(schema);
        }
    }
});
