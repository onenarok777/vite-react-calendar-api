const express = require("express");
const Router = express.Router();

const { login, me } = require("./modules");
const path = "/auth";

// เส้นทาง /auth/login
Router.post(path + "/login", (req, res) => {
  login(req, res)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

// เส้นทาง /auth/me
Router.get(path + "/me", (req, res) => {
  me(req, res)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

module.exports = Router;
