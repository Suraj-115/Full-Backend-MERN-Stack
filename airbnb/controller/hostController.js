const Home = require("../models/homes");


exports.gethome = (req,res,next)=>{
  Home.fetchAll( registeredHomes => res.render('./host/editHome' , {registeredHomes : registeredHomes,editing:false}) );
};

exports.getEditHome = (req,res,next)=>{
  const homeId = req.params.id;
  const editing = req.query.editing === "true";
  Home.findById(homeId, home => {
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
  res.redirect("./hostHomeList");
};

exports.postEditHome = (req,res,next)=>{
  const {homeName, price, location, image,id} = req.body;
  const home = new Home(
    homeName, 
    price,
    location,
    image
  );
  home.id=id;
  home.save();
  res.redirect("./hostHomeList");
};

exports.postDeleteHome = (req,res,next)=>{
  const homeId = req.params.id;
  console.log(homeId);
  Home.deleteById(homeId,err=>{
    if(err){
      console.log("Error deleting home",err);
    }
    res.redirect("../hostHomeList");
  }); 
};

exports.pagenotfound = (req,res,next)=>{
  res.status(404).render("404");
};

