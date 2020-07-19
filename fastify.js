const fastify = require("fastify")();
const path = require("path");

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
});

fastify.get("/events", (_req, reply) => {
  reply.raw.setHeader("Content-Type", "text/event-stream");
  reply.raw.setHeader("Cache-Control", "no-cache");
  reply.raw.setHeader("Connection", "keep-alive");

  const timeout = 500;
  setInterval(() => {
    const id = Date.now();
    const data = `Hello World ${id}`;
    const message = `retry: ${timeout}\nid:${id}\ndata: ${data}\n\n`;
    // reply.send(message); // do not use this method
    reply.raw.write(message);
  }, timeout);
});

fastify.listen(3000);
