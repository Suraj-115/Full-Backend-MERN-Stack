const Home = require("../models/homes");
const Favourite = require("../models/favourite");

exports.homepage = (req,res,next)=>{
  Home.find().then(registeredHomes => {
    res.render('./store/homeList',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getHomeDetails = (req,res,next)=>{
  const homeId = req.params.id;
  console.log("HomeID:",homeId);
  Home.findById(homeId).then(home => {
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
  Home.find().then(registeredHomes => {
    res.render('./store/index',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getBookings = (req,res,next)=>{
  Home.find().then(registeredHomes => {
    res.render('./store/bookings',{registeredHomes:registeredHomes});
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getFavouriteList = (req,res,next)=>{
  Favourite.find().populate("houseId").then((favourites) => {
      const favouriteIds = favourites.map(fav => fav.houseId);
      res.render("./store/favouriteList", { registeredHomes: favouriteIds });
      });
};

exports.postAddToFavouriteList = (req,res,next)=>{
  const homeId = req.body.homeId;
  const fav = new Favourite({houseId: homeId});
  fav.save().then(() => {
    console.log("Home added to favorites successfully");
  }).catch(error => {
    console.log("Error while adding favorites",error);
  }).finally(() => {
    res.redirect("/homeList");
  });
}

exports.postRemoveFromFavouriteList = (req,res,next)=>{
  const homeId = req.params.id;
  Favourite.findOneAndDelete({houseId: homeId}).then(() => {
    console.log("Home removed from favorites successfully");
  }).catch(error => {
    console.log("Error while removing from favorites",error);
  }).finally(() => {
    res.redirect("/favouriteList");
  });
 
}

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

