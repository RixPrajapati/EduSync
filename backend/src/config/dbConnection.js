import mongoose from "mongoose";
import config from "./config.js";

function dataBaseConnection() {
  console.log("DB_URL =", process.env.MONGODB_URL);
  mongoose
    .connect(config.dburl)
    .then(() => {
      console.log("DataBase Connected successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
export default dataBaseConnection;
