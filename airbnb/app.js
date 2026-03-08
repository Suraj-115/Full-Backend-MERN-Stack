// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://airbnb-clone:Gopal2008@airbnb.njdutq8.mongodb.net/?appName=airbnb";
const { default: mongoose } = require('mongoose');

//Local Module
const storeRouter = require("./Routes/storeRouter")
const hostRouter = require("./Routes/hostRouter")
const authRouter = require("./Routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const multer = require("multer");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

const randomString = (length) =>{
  const ch = 'qwertyuioplkjhgfdsazxcvbnm';
  let result='';
  for(let i=0;i<length;i++){
    result+=ch.charAt(Math.floor(Math.random()*ch.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null, "uploads/");
  },
  filename: (req,file,cb) =>{
    cb(null,randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req,file,cb)=>{
  if(['image/jpeg','image/png','image/jpg'].includes(file.mimetype)){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
};

app.use(express.urlencoded());
app.use(multer({storage,fileFilter}).single('photo'));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads',express.static(path.join(rootDir,"uploads")));
app.use('/host/uploads',express.static(path.join(rootDir,"uploads")));
app.use('/homes/uploads',express.static(path.join(rootDir,"uploads")));

app.use(session({
  secret: "KnowledgeGate AI with Complete Coding",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);


app.use(errorsController.pageNotFound);

const PORT = 3003;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});