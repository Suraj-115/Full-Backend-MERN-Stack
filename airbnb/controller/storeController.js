const Home = require("../models/homes");

exports.homepage = (req,res,next)=>{
  Home.fetchAll(registeredHomes => {
    res.render('./store/homeList',{registeredHomes:registeredHomes});
  });
}

exports.indexPage = (req,res,next)=>{
  Home.fetchAll(registeredHomes => {
    res.render('./store/index',{registeredHomes:registeredHomes});
  });
}

exports.getBookings = (req,res,next)=>{
  Home.fetchAll(registeredHomes => {
    res.render('./store/bookings',{registeredHomes:registeredHomes});
  });
}

exports.getFavouriteList = (req,res,next)=>{
  Home.fetchAll(registeredHomes => {
    res.render('./store/favouriteList',{registeredHomes:registeredHomes});
  });
}


exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

