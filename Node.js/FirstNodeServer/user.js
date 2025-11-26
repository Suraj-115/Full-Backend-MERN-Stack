const http = require('http');
const fs= require('fs');

const server = http.createServer((req, res) =>{
  console.log(req.url, req.method, req.headers); // Log the request URL, headers and method

  // process.exit(); // Terminate the server after logging the request 
  if(req.url ==='/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node Server</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1>');
    res.write('<form action="/submit-details" method="POST" >');
    res.write('<input type="text" name="username" placeholder="Enter your name:- "/> <br>');
    res.write('<label for="gender">Gender:</label><br>');
    res.write('<input type="radio" id="male" name="gender" value="male" />');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="female" name="gender" value="female" />');
    res.write('<label for="female">Female</label>');
    res.write('<br><button type="submit">Submit</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  else if(req.url.toLowerCase() === '/submit-details' && req.method == 'POST'){
    fs.writeFileSync('user.txt',"Suraj");
    res.statusCode = 302;
    res.setHeader('Location','/');
    return res.end();
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>404 Not Found</title></head>');
  res.write('<body><h1>Page Not Found</h1></body>');
  res.write('</html>');
  res.end(); 
});

const port = 3000;
server.listen(port,()=>{
  console.log(`Server is listening on address http://localhost:${port}`);
});
