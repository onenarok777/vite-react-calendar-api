const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser").json();
const config = require("./config/config.json");

app.use(bodyParser);
app.use(cors());

const auth = require("./apis/auth/routers");
app.use(auth);

app.listen(config.port, () => {
  console.log("server online port: " + config.port);
});
