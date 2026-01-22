// Core modules
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/pathUtil');

module.exports = class Home {
  constructor(houseName, price, location, image){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.image = image;
  }
  save(){
    Home.fetchAll( registeredHomes => {
      registeredHomes.push(this);
    const homeDataPath = path.join(rootDir,'data','homes.json');
    fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),err =>{
      console.log("File Writing Concluded", err);
    });
    });
    
  }
  static fetchAll(callback){
    const filePath = path.join(rootDir,'data','homes.json');
    fs.readFile(filePath,(err, data)=>{
      callback(!err ? JSON.parse(data) :[]);
    });
  }
}