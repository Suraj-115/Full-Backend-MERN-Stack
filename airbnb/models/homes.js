const mongoose = require("mongoose");
const Favourite = require("./favourite");

const homeSchema = new mongoose.Schema({
  houseName : {
    type:String,
    required:true
  },
  price : {
    type:Number,
    required:true
  },
  location : {
    type:String,
    required:true
  },
  rating : {
    type:Number,
    required:true
  },
  photoUrl : String,
  description :String
});


homeSchema.pre('findOneAndDelete', async function(next) {
  console.log("Pre hook for findByIdAndDelete called");
  const homeId = this.getQuery()._id;
  await Favourite.deleteOne({houseId : homeId});
});

module.exports = mongoose.model("Home",homeSchema);

/*
module.exports = class Home {
  constructor(houseName, price, location,rating, image,description,_id){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating= rating;
    this.photoUrl = image;
    this.description = description;
    if(_id) this._id = _id;
  }
  save(){
    const db = getDb();
    if(this._id){
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description
      };
      return db.collection("homes").updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields})
      }
    else
    {
      return db.collection("homes").insertOne(this);
    }
  }
  static fetchAll(){
   const db = getDb();
   return db.collection("homes").find().toArray();
  }

  static findById(homeId){
    const db = getDb();
    return db.collection("homes").find({_id : new ObjectId(String(homeId))}).next();
  }

  static deleteById(homeId){
    const db = getDb();
    return db.collection("homes").deleteOne({_id: new ObjectId(String(homeId))});
  }

}
  */