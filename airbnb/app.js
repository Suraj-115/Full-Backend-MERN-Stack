// Core module
const path = require("path");

// External modules
const express = require("express");
const app = express();

app.set("view engine","ejs");
app.set("views","views");

// Local modules
const storeRouter = require("./Routes/storeRouter");
const {hostRouter}= require("./Routes/hostRouter");
const errorController = require("./controller/error");
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({extended :true}));

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
});

app.use(express.static(path.join(__dirname,"public")));

app.use(storeRouter);
app.use("/host",hostRouter);

app.use(errorController.pagenotfound);

const port = 3000;

const DB_PATH = "mongodb+srv://airbnb-clone:Gopal2008@airbnb.njdutq8.mongodb.net/?appName=airbnb";

mongoose.connect(DB_PATH).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err=>{
  console.log("Error connecting to MongoDB:");
});

