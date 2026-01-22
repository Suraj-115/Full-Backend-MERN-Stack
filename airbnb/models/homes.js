// Core modules
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/pathUtil');
// fake database
const registeredHomes = [];

module.exports = class Home {
  constructor(houseName, price, location, image){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.image = image;
  }
  save(){
    registeredHomes.push(this);
    const homeDataPath = path.join(rootDir,'data','homes.json');
    fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),err =>{
      console.log("File Writing Concluded", err);
    });
  }
  static fetchAll(){
    return registeredHomes;
  }
}