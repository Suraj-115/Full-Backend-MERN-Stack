const Home = require("../models/homes");

exports.homepage = (req,res,next)=>{
  const registeredHomes = Home.fetchAll();
  res.render('home',{registeredHomes:registeredHomes});
}

exports.gethome = (req,res,next)=>{
  res.render("addhome");
};

exports.posthome = (req,res,next)=>{
  const {houseName, price, location, image} = req.body;
  const home = new Home(
    houseName,price,location,image
  );
  home.save();
  const registeredHomes = Home.fetchAll();
  res.render("homeEdit",{registeredHomes : registeredHomes});
};

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

