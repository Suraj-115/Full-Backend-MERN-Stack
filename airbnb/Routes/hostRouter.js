const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const homeController = require("../controller/hostController");

hostRouter.get("/add-home",homeController.gethome);

hostRouter.get("/editHome/:id",homeController.getEditHome);

hostRouter.post("/editHome",homeController.postEditHome);

hostRouter.post("/add-home",homeController.posthome);

hostRouter.post("/deleteHome/:id",homeController.postDeleteHome);

hostRouter.get("/hostHomeList",homeController.getHostHomeList);

exports.hostRouter = hostRouter;
