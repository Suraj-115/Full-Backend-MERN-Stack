const path = require("path");
const express = require("express");
const authRouter = express.Router();

const authController = require("../controller/authController");

authRouter.get("/login",authController.getLogin);

authRouter.get("/signup",authController.getSignUp);

authRouter.post("/login",authController.postLogin);

authRouter.post("/signup",authController.postSignup);

authRouter.post("/logout",authController.postLogout);

exports.authRouter = authRouter;
