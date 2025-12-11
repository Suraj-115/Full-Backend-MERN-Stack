// Core module
const path = require("path");

// External modules
const express = require("express");
const app = express();

// Local modules
const userRouter = require("./Routes/userRouter");

const hostRouter = require("./Routes/hostRouter");

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
});

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host",hostRouter);

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(__dirname,"views","404.html"));
})

const port = 3000;
app.listen(port,()=>{
  console.log(`Server is running on address http://localhost:${port}`);
});
