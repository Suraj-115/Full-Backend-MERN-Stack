const fs = require('fs');
console.log('1. Start of script');
console.log('2. Read file synchronously');
const dataSync = fs.readFileSync('example.txt', 'utf8');
console.log('3. dataSync:', dataSync);
console.log('4. Reading file asynchronously');
fs.readFile('example.txt','utf8',(err,dataAsync)=>{
  if(err) throw err;
  console.log('5. dataAsync:', dataAsync);
});
console.log('6. End of script');