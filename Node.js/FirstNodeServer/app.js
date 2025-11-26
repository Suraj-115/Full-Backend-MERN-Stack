const http = require('http');

const server = http.createServer((req, res) =>{
  console.log(req.url, req.method, req.headers); // Log the request URL, headers and method

  // process.exit(); // Terminate the server after logging the request 
  if(req.url ==='/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node Server</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
  }
  else if(req.url === '/product'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node Server</title></head>');
    res.write('<body><h1>Welcome to the Pro Page!</h1></body>');
    res.write('</html>');
    res.end();
  }
  else{
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>404 Not Found</title></head>');
    res.write('<body><h1>Page Not Found</h1></body>');
    res.write('</html>');
    res.end();
  }

  
});

const port = 3000;
server.listen(port,()=>{
  console.log(`Server is listening on address http://localhost:${port}`);
});
