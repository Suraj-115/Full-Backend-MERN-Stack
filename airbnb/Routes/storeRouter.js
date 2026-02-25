// core module
const path = require("path");

const express = require("express");
const storeRouter = express.Router();

const storeController = require("../controller/storeController");

storeRouter.get("/",storeController.indexPage);

storeRouter.get("/bookings",storeController.getBookings);

storeRouter.get("/favouriteList",storeController.getFavouriteList);

storeRouter.post("/favouriteList",storeController.postAddToFavouriteList);

storeRouter.post("/favouriteList/delete/:id",storeController.postRemoveFromFavouriteList);

storeRouter.get("/homeList",storeController.homepage);

storeRouter.get("/homeList/:id",storeController.getHomeDetails);

module.exports = storeRouter;