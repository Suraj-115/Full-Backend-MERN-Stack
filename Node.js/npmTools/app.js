const http = require('http');
const server = http.createServer((req, res) => {
   console.log('Received request for:', req.url);
});
const port=3000;
server.listen(port, () => {
   console.log(`Server is listening on port http://localhost:${port}`);
});