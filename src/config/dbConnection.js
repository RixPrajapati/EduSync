import mongoose from "mongoose";
import config from "./config.js";

function dataBaseConnection() {
  return mongoose
    .connect(config.dburl)
    .then(() => {
      console.log("DataBase Connected successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
export default dataBaseConnection;
