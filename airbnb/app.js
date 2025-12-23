// Core module
const path = require("path");

// External modules
const express = require("express");
const app = express();

app.set("view engine","ejs");
app.set("views","views");

// Local modules
const userRouter = require("./Routes/userRouter");
const {hostRouter}= require("./Routes/hostRouter");
const errorController = require("./controller/error");

app.use(express.urlencoded({extended :true}));

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
});

app.use(express.static(path.join(__dirname,"public")));

app.use(userRouter);
app.use("/host",hostRouter);

app.use(errorController.pagenotfound);

const port = 3000;
app.listen(port,()=>{
  console.log(`Server is running on address http://localhost:${port}`);
});
