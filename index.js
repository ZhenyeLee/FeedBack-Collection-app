const express = require("express");
const app = express();
// calling Express like a function, it generates a new application that represents a running express app.

//By calling app.get creating a brand new  route handler.
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
