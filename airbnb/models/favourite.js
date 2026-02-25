// Core modules
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/pathUtil');
//file path
const favouriteDataPath = path.join(rootDir,'data','favourite.json');

module.exports = class Favourite {
  static getFavourites(callback){
    fs.readFile(favouriteDataPath,'utf8',(err, data)=>{
      if (err || !data || data.trim() === '') return callback([]);
      try {
        callback(JSON.parse(data));
      } catch (e) {
        callback([]);
      }
    });
  }
  static addToFavourites(id,callback){
    Favourite.getFavourites( favourites => {
      if(!favourites.includes(id))favourites.push(id);
    fs.writeFile(favouriteDataPath,JSON.stringify(favourites),callback);
    });
  };
  static removeFromFavourites(id,callback){
    Favourite.getFavourites( favourites => {
      favourites = favourites.filter(favId => favId !== id);
    fs.writeFile(favouriteDataPath,JSON.stringify(favourites,null,2),callback || (()=>{}));
    });
  };
}