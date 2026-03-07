// core module
const path = require("path");

const express = require("express");
const storeRouter = express.Router();

const storeController = require("../controller/storeController");

// Simple auth helpers (guest protection for favourites/bookings)
const ensureAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.isLoggedIn || !req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
};

const ensureGuest = (req, res, next) => {
  const user = req.session && req.session.user;
  if (!user || user.userType !== "guest") {
    return res.redirect("/");
  }
  next();
};

storeRouter.get("/", storeController.indexPage);

// Guest-specific routes
storeRouter.get(
  "/bookings",
  ensureAuthenticated,
  ensureGuest,
  storeController.getBookings
);

storeRouter.get(
  "/favouriteList",
  ensureAuthenticated,
  ensureGuest,
  storeController.getFavouriteList
);

storeRouter.post(
  "/favouriteList",
  ensureAuthenticated,
  ensureGuest,
  storeController.postAddToFavouriteList
);

storeRouter.post(
  "/favouriteList/delete/:id",
  ensureAuthenticated,
  ensureGuest,
  storeController.postRemoveFromFavouriteList
);

// Browsing routes (available to any user type, including guests and hosts, and even unauthenticated users)
storeRouter.get("/homeList", storeController.homepage);

storeRouter.get("/homeList/:id", storeController.getHomeDetails);

module.exports = storeRouter;
