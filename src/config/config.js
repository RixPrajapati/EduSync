import dotenv from 'dotenv';

  dotenv.config();

 const config={
    port:process.env.PORT ||"",
    dburl:process.env.DB_URL||"",
    jwtSecret:process.env.JWT_SECRET,
    cloudinary:{
    cloudname:process.env.CLOUDINARY_CLOUD_NAME ||"",
    apikey:process.env.CLOUDINARY_API_KEY ||"",
    apisecret:process.env.CLOUDINARY_API_SECRET ||"" ,

}
} 
export default config;