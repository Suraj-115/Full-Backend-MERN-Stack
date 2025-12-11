const path = require('path');

const express = require('express');

const user = express.Router();
const rootDir = require('../utils/pathUtils');

user.get('/',(req,res,next)=>{
  console.log("In the GET / middleware");
  res.sendFile(path.join(rootDir,"views","home.html"));
  // next();
});

module.exports=user;