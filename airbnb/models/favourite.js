const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  houseId : {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    unique:true,
    ref:"Home"
  }
});

module.exports = mongoose.model("Favourite",favouriteSchema);


/*
module.exports = class Favourite {
  constructor(houseId){
    this.houseId = houseId;
  }

  save(){
    const db = getDb();
    return db.collection("favourites").findOne({houseId : this.houseId}).then(existingFav =>{
      if(!existingFav){
        return db.collection("favourites").insertOne(this);
      }
      return Promise.resolve();
    });
  }

  static getFavourites(){
    const db = getDb();
    return db.collection('favourites').find().toArray();
  }

  static removeFromFavourites(delHomeId){
    const db = getDb();
    return db.collection("favourites").deleteOne({houseId: delHomeId});
  };
}

*/