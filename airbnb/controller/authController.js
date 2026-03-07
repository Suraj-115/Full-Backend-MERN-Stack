const {check, validationResult} = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


exports.getLogin = (req,res,next)=>{
  res.render('auth/login',
     {
      isLoggedIn: !!req.session?.isLoggedIn,
      user: {} 
    });
};

exports.getSignUp = (req,res,next)=>{
  res.render('auth/signup', {
    isLoggedIn: !!req.session?.isLoggedIn,
    errors:[],
    oldInput : {firstName:"", lastName:"", email:"", password:""},
    user: {} 
  });
};

exports.postLogin = async (req,res,next)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email:email});
  if(!user){
    return res.status(422).render("auth/login",{
      isLoggedIn:false,
      errors:[`User does not exist`],
      oldInput : {email, password},
      user: {} 
    });
  }
  
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(422).render("auth/login",{
      isLoggedIn:false,
      errors:[`Invalid Password`],
      oldInput : {email},
      user: {} 
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;

  req.session.save(err => {
    if (err) {
      console.log("Error saving session during login:", err);
    }
    res.redirect('/');
  });
};

exports.postSignup = [
  check("firstName").trim().isLength({min:3}).withMessage("First name should be 3 character long").matches(/^[a-zA-Z\s]+$/).withMessage("First Name should contain letters only"),

  check("lastName").trim().isLength({min:3}).withMessage("Last name should be 3 character long").matches(/^[a-zA-Z\s]+$/).withMessage("Last Name should contain letters only"),

  check("email").isEmail().withMessage("Email should be valid").normalizeEmail(),

  check("password").trim().isLength({min:8}).withMessage("Password must be atleast 8 characters long").matches(/[a-z]/).withMessage("Password must contain 1 lower case alphabet").matches(/[A-Z]/).withMessage("Password must contain atleast 1 upper case alphabet").matches(/[!@#$%^&*()_,./{}|<>:]/).withMessage("Password must contain a special character"),

  check("confirmPassword").trim().custom((value,{req})=>{
    if(value !== req.body.password){
      throw new Error("Password do not match");
    }
    return true;
  }),

  check('userType').notEmpty().withMessage("User Type is required").isIn(['guest','host']).withMessage("Invalid User Type"),

  check('termsAndConditions').notEmpty().withMessage("You must accept the terms and conditions").custom(value=>{
    if(value != 'on'){
      throw new Error("You must accept the terms and conditions");
    }
    return true;
  }),

  (req,res,next)=>{
    const {firstName, lastName, email, password, userType} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).render("auth/signup",{
        isLoggedIn:false,
        errors:errors.array().map(err=>err.msg),
        oldInput : {firstName, lastName, email, password}
      });
    }
     
    bcrypt.hash(password,10).
    then(hashedPassword=>{
      const user = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        userType
      });
      return user.save();
    }).
    then(result=>{
      res.redirect('/auth/login');
    }).
    catch(err=>{
      return res.status(422).render("auth/signup",{
        isLoggedIn:false,
        errors:[err.message],
        oldInput : {firstName, lastName, email, password},
        user: {} 
      });
    });
  }
]

exports.postLogout = (req,res,next)=>{
  req.session.destroy(()=>{
   res.redirect('/');
  });
};