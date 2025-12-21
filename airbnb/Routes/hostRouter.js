const path = require("path");
const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(__dirname,"../","views","addhome.html"));
});

const registeredHomes = [];

hostRouter.post("/add-home",(req,res,next)=>{
  console.log("home registration successfully for:",req.body,req.body.homeName);
  registeredHomes.push({houseName : req.body.homeName});
  res.sendFile(path.join(__dirname,"../","views","homeEdit.html"));
});

exports.hostRouter = hostRouter;
exports.registeredHomes= registeredHomes;