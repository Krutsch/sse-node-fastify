const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    var html = fs.readFileSync("./public/index.html", "utf8");
    res.end(html);
  }

  if (req.url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    return setInterval(() => {
      const id = Date.now();
      const data = `Hello World ${id}`;
      const message = `retry: ${1000}\nid:${id}\ndata: ${data}\n\n`;
      res.write(message);
    }, 500);
  }
});

server.listen(3000);
