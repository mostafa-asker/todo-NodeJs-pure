const http = require("http");
const url = require("url");
const TodoController = require(`${__dirname}/Controllers/TodoController.js`);
const todoController = new TodoController();

const server = http.createServer(async (req, res) => {
  const { pathname: pathName, query } = url.parse(req.url, true);

  if (pathName === "/" || pathName === "/home") {
    try {
      const data = await todoController.list();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  } else if (pathName === "/create" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const todoData = JSON.parse(body);
        const createdTodo = await todoController.create(todoData);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(createdTodo));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ 
          status: 500,
          success: false,
          error: err.message 
        }));
      }
    });
  } else if (pathName === "/update" && req.method === "PUT") {
    if (!query.id) {
      res.writeHead({ "Conent-type": "application/json" });
      res.end({
        status: 404,
        success: false,
        error: "Not found",
      });
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const todoData = JSON.parse(body);
        const updatedTodo = await todoController.update(todoData, query.id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedTodo));
      } catch (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ 
          status: 404,
          success: false,
          error: err.message 
        }));
      }
    });
  } else if (pathName === "/delete" && req.method === "DELETE") {
    try {
      const deletedMessage = await todoController.delete(
        parseInt(query.id, 10)
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(deletedMessage));
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: 404,
        success: false,
        message: "Not found",
      })
    );
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for requests on port 8000 ...");
});
