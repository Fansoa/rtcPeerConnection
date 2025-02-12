console.log("Hello via Bun!");

import express from "express";

const app = express();

const port = 8181;

app.use(express.static(__dirname))

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
