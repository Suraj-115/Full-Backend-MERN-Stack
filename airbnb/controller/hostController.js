const Home = require("../models/homes");
const Favourite = require("../models/favourite");

exports.gethome = (req,res,next)=>{
  Home.find().then( (registeredHomes) => res.render('./host/editHome' , {registeredHomes : registeredHomes,editing:false}) );
};

exports.getEditHome = (req,res,next)=>{
  const homeId = req.params.id;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if(!home){
      console.log("Home not found");
      return res.redirect("/host/hostHomeList");
    }
    else{
      console.log("Editing mode:", home);
      res.render('./host/editHome' , {home : home,editing:editing});
    }
  });
};


exports.getHostHomeList = (req,res,next)=>{
  Home.find().then((registeredHomes) => {
    res.render('./host/hostHomeList',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.posthome = (req,res,next)=>{
  const {homeName, price, location, image,rating,description} = req.body;
  // Map homeName from form to houseName for the model
  const home = new Home(
    {houseName:homeName, 
    price: price,
    location: location,
    rating: rating,
    photoUrl: image,
    description: description}
  );
  home.save().then(()=>{
    console.log("Home saved successfully");
  });
  res.redirect("/host/hostHomeList");
};

exports.postEditHome = (req,res,next)=>{
  const {homeName, price, location, image, rating, description, id} = req.body;
  Home.findById(id).then(home =>{
    home.houseName = homeName;
    home.price = price;
    home.location = location;
    home.photoUrl = image;
    home.rating = rating;
    home.description = description;
    home.save().then(()=>{
      console.log("Home updated successfully");
    }).catch(err => {
      console.log("Error while updating home",err);
    });
  }).catch(err => {
    console.log("Error while finding home for update",err);
  });
  res.redirect("/host/hostHomeList"); 
};

exports.postDeleteHome = (req,res,next)=>{
  const homeId = req.params.id;
  console.log(homeId);
  Home.findByIdAndDelete(homeId).then(() => {
    console.log("Home deleted successfully");
  }).catch(err => {
    console.log("Error deleting home",err);
  }).finally(() => {
    res.redirect("/host/hostHomeList");
  }); 
};

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

