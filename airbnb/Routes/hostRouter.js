const path = require("path");
const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(__dirname,"../","views","addhome.html"));
});

hostRouter.post("/add-home",(req,res,next)=>{
  console.log(req.body);
  res.sendFile(path.join(__dirname,"../","views","homeEdit.html"));
});

module.exports = hostRouter;