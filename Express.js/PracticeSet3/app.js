const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

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

app.get('/',(req,res,next)=>{
  console.log("In the GET / middleware");
  res.send("<h1>Hello from GET /</h1>");
  // next();
});

app.get("/contact-us",(req,res,next)=>{
  console.log("In the GET /contact-us middleware");
  res.send(`
    <h1>Please share your details</h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="your name"/>
      <input type="email" name="email" placeholder="your email"/>
      <button type="submit">Submit</button>
    </form>
  `);
});
app.post("/contact-us",(req,res,next)=>{
  console.log("First POST /contact-us middleware",req.body);
  next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us",(req,res,next)=>{
  console.log("Second POST /contact-us middleware",req.body);
  res.send("<h1>Thank you for submitting your details.</h1>");
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});