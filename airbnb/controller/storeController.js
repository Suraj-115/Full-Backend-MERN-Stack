const Favourite = require("../models/favourite");
const Home = require("../models/homes");

exports.homepage = (req,res,next)=>{
  Home.fetchAll(registeredHomes => {
    res.render('./store/homeList',{registeredHomes:registeredHomes});
  });
}

exports.getHomeDetails = (req,res,next)=>{
  const homeId = req.params.id;
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
  Favourite.getFavourites(favourites => {
    Home.fetchAll(registeredHomes => {
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

