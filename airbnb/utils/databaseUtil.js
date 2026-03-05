const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const URL =
  "mongodb+srv://airbnb-clone:Gopal2008@airbnb.njdutq8.mongodb.net/?appName=airbnb";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb-clone");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB Atlas", err);
    });
};


const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized.");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;