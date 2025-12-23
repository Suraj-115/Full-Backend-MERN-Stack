// core module
const path = require("path");

const express = require("express");
const userRouter = express.Router();

const homeController = require("../controller/home");

userRouter.get("/",homeController.homepage);

module.exports = userRouter;