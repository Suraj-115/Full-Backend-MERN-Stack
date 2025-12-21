// core module
const path = require("path");

const express = require("express");
const userRouter = express.Router();

const {registeredHomes} = require("./hostRouter");

userRouter.get("/",(req,res,next)=>{
  console.log("registered homes are:",registeredHomes);
  res.render('home',{homes:registeredHomes});
});
module.exports = userRouter;