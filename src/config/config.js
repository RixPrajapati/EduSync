import dotenv from 'dotenv';

  dotenv.config();

 const config={
    port:process.env.PORT ||"",
    app_url:process.env.APP_URL || "",
    dburl:process.env.DB_URL||"",
    jwtSecret:process.env.JWT_SECRET || "",
    cloudinary:{
    cloudname:process.env.CLOUDINARY_CLOUD_NAME ||"",
    apikey:process.env.CLOUDINARY_API_KEY ||"",
    apisecret:process.env.CLOUDINARY_API_SECRET ||"" ,
  

},
resend_email_api_key:process.env.RESEND_EMAIL_API_KEY ||""


} 
export default config;