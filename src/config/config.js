import dotenv from 'dotenv';

  dotenv.config();

 const config={
    port:process.env.PORT ||"",
    dburl:process.env.DB_URL||"",
    jwtSecret:process.env.JWT_SECRET
} 
export default config;