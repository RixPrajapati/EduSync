import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";
function cloudinaryConnection() {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudname,
    api_key: config.cloudinary.apikey,
    api_secret: config.cloudinary.apisecret,
    secure: true,
  });

  // console.log("cloudinary connected")
  console.log(config.cloudinary.apisecret);
}
export default cloudinaryConnection;
