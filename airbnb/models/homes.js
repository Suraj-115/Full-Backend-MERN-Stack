// Core modules
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/pathUtil');
const Favourite = require("./favourite");
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
    
    
    Home.fetchAll( registeredHomes => {
      if(this.id){
        registeredHomes = registeredHomes.map(h =>
          h.id === this.id ? this : h
        );
      }
      else{
        this.id=Math.random().toString();
        registeredHomes.push(this);
      }
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

  static deleteById(homeId,callback){
    this.fetchAll(registeredHomes=>{
      registeredHomes = registeredHomes.filter(h => h.id !== homeId);
      fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),callback);
    });
    Favourite.removeFromFavourites(homeId,err=>{
      if(err) console.log("Error removing from favourites:", err);
    });
  }
  
}