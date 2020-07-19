const fastify = require("fastify")();
const path = require("path");

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
});

fastify.get("/events", (_req, reply) => {
  reply
    .type("text/event-stream")
    .header("Cache-Control", "no-cache")
    .header("Connection", "keep-alive")
    .code(200);

  const timeout = 500;
  setInterval(() => {
    const id = Date.now();
    const data = `Hello World ${id}`;
    const message = `retry: ${timeout}\nid:${id}\ndata: ${data}\n\n`;
    // reply.send(message); // definitely more than 500ms
    reply.raw.write(message); // this is not working
  }, timeout);
});

fastify.listen(3000);
