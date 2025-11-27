const addition = require('./sum');

const home = (req,res)=>{
  if(req.url === '/'){
    res.setHeader('Content-Type','text/html');  
    res.write('<h1>Welcome to the Home Page</h1>');
    res.write('<a href="/calculator"> Calculator </a>')
    return res.end();
  }
  else if(req.url ==='/calculator'){
    res.setHeader('Content-Type','text/html');
    res.write('<h1>Calculator Page</h1>');
    res.write('<form action="/calculator-result" method="POST">');
    res.write('Enter First Number: <input type="number" name="num1"><br>');
    res.write('Enter Second Number: <input type="number" name="num2"><br>');
    res.write('<button type="submit">Calculate Sum</button>');
    res.write('</form>');
    res.end();
  }
  else if(req.url === '/calculator-result' && req.method === 'POST'){
    const body = [];
    req.on('data',(chunk)=>{
      body.push(chunk);
    });
    req.on('end',()=>{
      const fullBody = Buffer.concat(body).toString();
      const parsedBody = new URLSearchParams(fullBody);
      const obj = Object.fromEntries(parsedBody);
      const n1 = parseInt(obj.num1);
      const n2 = parseInt(obj.num2);
      const sum=addition(n1,n2);
      res.setHeader('Content-Type','text/html');
      res.write('<h1>Calculation Result</h1>');
      res.write(`<p>The sum of ${n1} and ${n2} is: <strong>${sum}</strong></p>`);
      res.write('<a href="/calculator"> Perform Another Calculation </a>');
      return res.end();
    });
  }
  else{
    res.statusCode =404;
    res.setHeader('Content-Type','text/html');
    res.write('<h1>404 - page not found</h1>');
    res.write('<a href="/"> Go to Home Page </a>');
    return res.end();
  }
}

module.exports = home;