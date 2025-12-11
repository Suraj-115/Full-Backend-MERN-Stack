const path=require("path");
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const user = require('./Routes/user');
const contact = require('./Routes/contact');
const rootDir = require('./utils/pathUtils');
// app.use((req,res,next)=>{
//   console.log("first dummy middleware",req.url,req.method);
//   next();
// });

// app.use((req,res,next)=>{
//   console.log("second dummy middleware",req.url,req.method);
//   next();
// });

// app.use((req,res,next)=>{
//   console.log("third dummy middleware",req.url,req.method);
//   res.send("<h1>Response from the third middleware</h1>");
// });


// app.post("/contact-us",(req,res,next)=>{
//   console.log("First POST /contact-us middleware",req.body);
//   next();
// });

app.use(bodyParser.urlencoded());

app.use(user);
app.use(contact);
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,"views","404.html"));
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});