const express = require('express');
const app = express();
const port = 3000

app.get("/user/:id", function(req, res) {
  res.send("user " + req.params.id);
});

app.listen(port, function () {
  console.log(`Listening http://localhost:${port} `);
});
