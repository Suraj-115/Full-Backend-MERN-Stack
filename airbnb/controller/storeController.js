const Home = require("../models/homes");

exports.homepage = (req,res,next)=>{
  Home.fetchAll(registeredHomes => {
    res.render('./store/homeList',{registeredHomes:registeredHomes});
  });
}

exports.getHomeDetails = (req,res,next)=>{
  const homeId = req.params.homeId;
  console.log("HomeID:",homeId);
  Home.findById(homeId,home => {
    if(!home){
      console.log("Home not found");
      res.redirect("/homeList");
    }
    else{
      // console.log("Home Details:",home);
      res.render("./store/homeDetail",{home:home});
    }
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

