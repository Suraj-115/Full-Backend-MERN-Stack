const path = require('path');
const express = require('express');
const contact = express.Router();

const rootDir = require('../utils/pathUtils');

contact.get("/contact-us",(req,res,next)=>{
  console.log("In the GET /contact-us middleware");
  res.sendFile(path.join(rootDir,"views","form.html"));
});

contact.post("/contact-us",(req,res,next)=>{
  console.log("Second POST /contact-us middleware",req.body);
  res.sendFile(path.join(rootDir,"views","formSubmit.html"));
});

module.exports = contact;