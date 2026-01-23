const Home = require("../models/homes");


exports.gethome = (req,res,next)=>{
  Home.fetchAll( registeredHomes => res.render('./host/addhome' , {registeredHomes : registeredHomes}) );
};


exports.getHostHomeList = (req,res,next)=>{
  Home.fetchAll(registeredHomes => {
    res.render('./host/hostHomeList',{registeredHomes:registeredHomes});
  });
}

exports.posthome = (req,res,next)=>{
  const {homeName, price, location, image} = req.body;
  // Map homeName from form to houseName for the model
  const home = new Home(
    homeName, // This will be stored as houseName in the model
    price,
    location,
    image
  );
  home.save();
  Home.fetchAll(registeredHomes => {
    res.render("./host/homeEdit",{registeredHomes : registeredHomes});
  });
};

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

