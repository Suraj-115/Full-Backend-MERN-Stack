const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const homeController = require("../controller/hostController");

hostRouter.get("/add-home",homeController.gethome);

hostRouter.post("/add-home",homeController.posthome);

hostRouter.get("/hostHomeList",homeController.getHostHomeList);

exports.hostRouter = hostRouter;
