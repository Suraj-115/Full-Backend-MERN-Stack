// Core modules
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/pathUtil');
//file path
const homeDataPath = path.join(rootDir,'data','homes.json');

module.exports = class Home {
  constructor(houseName, price, location, image){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.image = image;
  }
  save(){
    this.id=Math.random().toString();
    Home.fetchAll( registeredHomes => {
      registeredHomes.push(this);
    fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),err =>{
      console.log("File Writing Concluded", err);
    });
    });
    
  }
  static fetchAll(callback){
    fs.readFile(homeDataPath,(err, data)=>{
      callback(!err ? JSON.parse(data) :[]);
    });
  }

  static findById(homeId, callback){
    this.fetchAll(registeredHomes=>{
      const home = registeredHomes.find(h => h.id === homeId);
      callback(home);
    });
  }
}