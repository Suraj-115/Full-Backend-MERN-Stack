// core module
const path = require("path");

const express = require("express");
const storeRouter = express.Router();

const homeController = require("../controller/storeController");

storeRouter.get("/",homeController.indexPage);

storeRouter.get("/bookings",homeController.getBookings);

storeRouter.get("/favouriteList",homeController.getFavouriteList);

storeRouter.get("/homeList",homeController.homepage);

storeRouter.get("/homeList/:homeId",homeController.getHomeDetails);

module.exports = storeRouter;