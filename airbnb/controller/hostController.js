const Favourite = require("../models/favourite");
const Home = require("../models/homes");


exports.gethome = (req,res,next)=>{
  Home.fetchAll().then( (registeredHomes) => res.render('./host/editHome' , {registeredHomes : registeredHomes,editing:false}) );
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
  Home.fetchAll().then((registeredHomes) => {
    res.render('./host/hostHomeList',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.posthome = (req,res,next)=>{
  const {homeName, price, location, image,rating,description} = req.body;
  // Map homeName from form to houseName for the model
  const home = new Home(
    homeName, 
    price,
    location,
    rating,
    image,
    description
  );
  home.save().then(()=>{
    console.log("Home saved successfully");
    res.redirect("/host/hostHomeList");
  }).catch(err => {
    console.log("Error saving home", err);
    res.redirect("/host/add-home");
  });
};

exports.postEditHome = (req,res,next)=>{
  const {homeName, price, location, image, rating, description, id} = req.body;
  const home = new Home(
    homeName, 
    price,
    location,
    rating,
    image,
    description,
    id
  );
  home.save().then((result)=>{
    console.log("Home updated successfully");
    res.redirect("/host/hostHomeList");
  }).catch(err => {
    console.log("Error updating home", err);
    res.redirect("/host/hostHomeList");
  });
};

exports.postDeleteHome = (req,res,next)=>{
  const homeId = req.params.id;
  console.log(homeId);
  Home.deleteById(homeId).then(() => {
    console.log("Home deleted successfully");
    Favourite.removeFromFavourites(homeId).then(() => {
      console.log("Home removed from favorites successfully");
    }).catch(error => {
      console.log("Error while removing from favorites",error);
    });
  }).catch(err => {
    console.log("Error deleting home",err);
  }).finally(() => {
    res.redirect("/host/hostHomeList");
  }); 
};

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

