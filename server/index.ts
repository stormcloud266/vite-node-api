import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const server = Fastify({ logger: true });

server.register(cors, {
  origin: function (origin, callback) {
    if (
      process.env.NODE_ENV === "development" ||
      origin === process.env.APP_DOMAIN
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
});

// Declare a route
server.get("/hello", function (request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
server.listen({ port: 3000 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
