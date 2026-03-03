const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gopal@2008',
  database: 'airbnb'
});

module.exports = pool.promise();

// const mongo = require("mongodb");
// const MongoClient = mongo.MongoClient;

// // Prefer environment variable if set, fall back to hardcoded Atlas URL
// const MONGO_URL =
//   process.env.MONGO_URL ||
//   "mongodb+srv://airbnb-clone:Gopal%402008@airbnb-clone.wiqdkdi.mongodb.net/?appName=airbnb-clone";

// const mongoConnect = () => {
//   return MongoClient.connect(MONGO_URL).then((client)=>{
//     console.log(client);
//   }).catch((err)=>{
//     console.error("Failed to connect to MongoDB Atlas", err);
//   });
// };

// module.exports = mongoConnect;
