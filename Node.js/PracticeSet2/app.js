const http = require('http');
const home = require('./home');
const server = http.createServer(home);
const PORT=3000;
server.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});
