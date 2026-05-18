import Fastify from "fastify";
import fp from "fastify-plugin";
import closeWithGrace from "close-with-grace";

import { serverFactory } from "fastify-uws";

import serviceApp from "./app";
import { initPassword } from "@services/auth/password";

const app = Fastify({
    logger:
        process.env.NODE_ENV === "production"
            ? true
            : {
                  transport: {
                      target: "pino-pretty",
                      options: {
                          translateTime: "HH:MM:ss Z",
                          ignore: "pid,hostname",
                      },
                  },
              },
    trustProxy: process.env.NODE_ENV === "production",
    serverFactory,
});

closeWithGrace({ delay: 1000 }, async ({ err, signal }) => {
    if (err) app.log.error(err);
    app.log.info({ signal }, "Graceful shutdown initiated");

    await app.close();
});

const init = async () => {
    app.register(fp(serviceApp));

    await initPassword();
    app.log.info("Decoy hash generated");

    await app.ready();

    const serverRegistry = app.server as any;
    const serverSymbols = Object.getOwnPropertySymbols(serverRegistry);

    // Look for the symbol that actually holds the uWS App instance objects
    const uwsSymbol = serverSymbols.find((sym) => {
        const value = serverRegistry[sym];
        // The uWS app always exposes an .any or .listen method at the C++ level
        return value && typeof value.any === "function";
    });

    if (uwsSymbol) {
        const genericApp = app as any;
        genericApp["uws"] = serverRegistry[uwsSymbol];
        app.log.info("[uWS]: Successfully attached native C++ uWS instance!");
    } else {
        app.log.error("[uWS]: Critical - Could not identify the uWS engine symbol.");
    }

    app.swagger();
    app.log.info("Plugins loaded");

    try {
        app.listen(
            {
                host: "0.0.0.0",
                port: parseInt(process.env.PORT ?? "3000", 10),
            },
            (err, address) => {
                app.log.info("App listening at " + address);
            },
        );
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

init();
