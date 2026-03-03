const Favourite = require("../models/favourite");
const Home = require("../models/homes");

exports.homepage = (req,res,next)=>{
  Home.fetchAll().then(([registeredHomes]) => {
    res.render('./store/homeList',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getHomeDetails = (req,res,next)=>{
  const homeId = req.params.id;
  console.log("HomeID:",homeId);
  Home.findById(homeId).then(([rows]) => {
    const home = rows && rows.length ? rows[0] : null;
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homeList");
    }
    res.render("./store/homeDetail",{home});
  }).catch(err => {
    console.log("Error while fetching home details", err);
    res.redirect("/homeList");
  });
}

exports.indexPage = (req,res,next)=>{
  Home.fetchAll().then(([registeredHomes]) => {
    res.render('./store/index',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getBookings = (req,res,next)=>{
  Home.fetchAll().then(([registeredHomes]) => {
    res.render('./store/bookings',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getFavouriteList = (req,res,next)=>{
  Favourite.getFavourites(favourites => {
    Home.fetchAll().then(([registeredHomes]) => {
    const HomesInFavourites = registeredHomes.filter(home => favourites.includes(home.id));
      res.render('./store/favouriteList',{registeredHomes:HomesInFavourites});
    });     
  });
}

exports.postAddToFavouriteList = (req,res,next)=>{
  Favourite.addToFavourites(req.body.homeId,error=>{
    if(error){
      console.log("Error while adding favorites",error);
    }
    res.redirect("/favouriteList");
  });
}

exports.postRemoveFromFavouriteList = (req,res,next)=>{
  Favourite.removeFromFavourites(req.params.id,error=>{
    if(error){
      console.log("Error while removing favorites",error);
    }
    res.redirect("/favouriteList");
  });
 
}

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

