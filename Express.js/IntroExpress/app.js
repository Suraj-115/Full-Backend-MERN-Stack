// Core Modules
// const http = require('http');

// External Modules
const express = require('express');

// Local Module
const userRequestHandler = require('./user');

// executing express and making a function of it named app
const app = express();

app.use("/",(req,res,next)=>{
  console.log("First Middleware",req.url,req.method);
  // res.send('<h1>Hello from Express.js Server</h1>');
  next();
});

app.use("/submit-details",(req,res,next)=>{
  console.log("Second Middleware",req.url, req.method);
  res.send('<h1>This is the Second Middleware Response</h1>');
  // next();
});

// const server = http.createServer(app);

const port = 3000;
app.listen(port,()=>{
  console.log(`Server is listening on address http://localhost:${port}`);
});
