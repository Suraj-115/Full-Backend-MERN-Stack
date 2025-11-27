const http = require('http');
const server=http.createServer((req,res)=>{
  console.log(req.url,req.method,req.headers);
  if(req.url === '/'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Home Page</title>');
    res.write('<style>');
    res.write('nav{background-color:lightblue; padding:10px;}');
    res.write('nav ul{list-style:none; display:flex; justify-content:space-around;}');
    res.write('nav ul li a{text-decoration:none; font-weight:bold; color:black;}');
    res.write('</style>');
    res.write('</head>');
    res.write('<body>');
    res.write(`<nav>`);
    res.write('<ul>');
    res.write('<li><a href="/home">HOME</a></li>');
    res.write('<li><a href="/men">Men</a></li>');
    res.write('<li><a href="/women">Women</a></li>');
    res.write('<li><a href="/kids">Kids</a></li>');
    res.write('<li><a href="/cart">Cart</a></li>');
    res.write('</ul>');
    res.write('</nav>');
    res.write('</body>');
    res.write('</html>');
  }
  else if(req.url ==='/home'){
    res.setHeader("Content-Type","text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Home Page</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Welcome to the HOME page</h1>");
    res.write("</body>");
    res.write("</html>");
  }
  else if(req.url ==='/men'){
    res.setHeader("Content-Type","text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Men Page</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Welcome to the MEN page</h1>");
    res.write("</body>");
    res.write("</html>");
  }
  else if(req.url ==='/women'){
    res.setHeader("Content-Type","text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Women Page</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Welcome to the Women page</h1>");
    res.write("</body>");
    res.write("</html>");
  }
  else if(req.url ==='/kids'){
    res.setHeader("Content-Type","text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Kids Page</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Welcome to the Kids page</h1>");
    res.write("</body>");
    res.write("</html>");
  }
  else if(req.url ==='/cart'){
    res.setHeader("Content-Type","text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Cart Page</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Welcome to the CART page</h1>");
    res.write("</body>");
    res.write("</html>");
  }
  res.end();
});
const port=8080;
server.listen(port,()=>{
  console.log(`Server is listening on http://localhost:${port}`);
});