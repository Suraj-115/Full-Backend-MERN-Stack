console.log("This is the first JavaScript file.");
const fs = require('fs');
fs.writeFile("output.txt", "Hello, World!", (err) => {
    if (err) console.log("err ");
    console.log("File has been saved!");
});


