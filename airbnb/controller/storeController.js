const Home = require("../models/homes");
const User = require("../models/user");

exports.homepage = (req,res,next)=>{
  Home.find().then(registeredHomes => {
    res.render('./store/homeList',
      {
        registeredHomes:registeredHomes, 
        isLoggedIn:req.session.isLoggedIn,
        user: req.session.user 
      });
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
    res.render("./store/homeDetail",
      {
        home ,
        isLoggedIn:req.session.isLoggedIn,
        user: req.session.user 
      });
  }).catch(err => {
    console.log("Error while fetching home details", err);
    res.redirect("/homeList");
  });
}

exports.indexPage= (req,res,next)=>{
  console.log("Session ", req.session);
  Home.find().then(registeredHomes => {
    res.render('./store/index',
      {
        registeredHomes:registeredHomes, 
        isLoggedIn:req.session.isLoggedIn,
        user: req.session.user 
      });
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getBookings = (req,res,next)=>{
  Home.find().then(registeredHomes => {
    res.render('./store/bookings',
      {
        registeredHomes:registeredHomes, 
        isLoggedIn:req.session.isLoggedIn,
        user: req.session.user
      });
  }).catch(err=>{
    console.log("Error while fetching data from database",err);
  });
}

exports.getFavouriteList = async (req,res,next)=>{
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favouriteList",{
    favouriteHomes: user.favourites,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
};

exports.postAddToFavouriteList = async (req,res,next)=>{
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/homeList");
}

exports.postRemoveFromFavouriteList = async (req,res,next)=>{
  const homeId = req.params.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(user.favourites.includes(homeId)){
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect("/favouriteList");
}

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

