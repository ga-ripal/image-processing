const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const port = process.env.port || 8086;

app.use(require("./routes/index.route"));

app.listen(port, () => {
  console.log(`Server is starting at ${port}
    http://localhost:${port}/api/v1/`);
});
