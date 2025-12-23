const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const homeController = require("../controller/home");

hostRouter.get("/add-home",homeController.gethome);

hostRouter.post("/add-home",homeController.posthome);

exports.hostRouter = hostRouter;
