console.log('1. Start of script');
Promise.resolve().then(()=> console.log('2. Microtask 1'));
setTimeout(()=> console.log('3. Timer 1'), 1);
const fs = require('fs');
fs.readFile('example.txt', ()=> console.log('4. I/O operation'));
setImmediate(()=> console.log('5. Immediate 1'));
process.on('exit',(code)=>{
  console.log('6. Process exit with code:', code);
});
console.log('7. end of script');