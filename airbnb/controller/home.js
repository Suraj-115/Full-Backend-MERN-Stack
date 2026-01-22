const Home = require("../models/homes");

exports.homepage = (req,res,next)=>{
  const registeredHomes = Home.fetchAll();
  res.render('home',{registeredHomes:registeredHomes});
}

exports.gethome = (req,res,next)=>{
  Home.fetchAll( registeredHomes => res.render('home' , {registeredHomes : registeredHomes}) );
};

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
  const registeredHomes = Home.fetchAll();
  res.render("homeEdit",{registeredHomes : registeredHomes});
};

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

