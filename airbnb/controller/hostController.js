const Home = require("../models/homes");


exports.gethome = (req,res,next)=>{
  Home.fetchAll().then( ([registeredHomes]) => res.render('./host/editHome' , {registeredHomes : registeredHomes,editing:false}) );
};

exports.getEditHome = (req,res,next)=>{
  const homeId = req.params.id;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
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
  Home.fetchAll().then(([registeredHomes]) => {
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
  home.save();
  res.redirect("./hostHomeList");
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
  home.save();
  res.redirect("./hostHomeList");
};

exports.postDeleteHome = (req,res,next)=>{
  const homeId = req.params.id;
  console.log(homeId);
  Home.deleteById(homeId).then(result => {
    res.redirect("../hostHomeList");
  }).catch(err => {
    console.log("Error deleting home",err);
  }); 
};

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

