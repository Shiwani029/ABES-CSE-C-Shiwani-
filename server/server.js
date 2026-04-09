require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5001;

const user = {
  email: "test@gmail.com",
  password: "1234"
};

const server = http.createServer((req, res) => {

  console.log("Incoming:", req.method, req.url);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  // ✅ GET route
  if (req.method === "GET" && req.url === "/login") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Login route is working");
  }

  // ✅ POST route
  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let data;

      try {
        data = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Invalid JSON" }));
      }

      if (data.email === user.email && data.password === user.password) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Login successful" }));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Invalid credentials" }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});