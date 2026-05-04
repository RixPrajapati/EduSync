import Express from'express'
import config  from './config/config.js';
import userRouter from './routes/user.route.js';
import authRouter from"./routes/auth.route.js"
import dataBaseConnection from './config/dbConnection.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import cloudinaryConnection from './config/cloudinary.js';

const app=Express();

dataBaseConnection()
cloudinaryConnection()
app.use(bodyParser.json())
app.use(cookieParser())


const upload = multer({ storage:multer.memoryStorage() })


app.use("/api/user",upload.array('profile', 12),userRouter)
app.use("/api/auth",upload.array('profile', 12),authRouter)

app.listen(config.port,()=>{
    console.log("Server started at 9090");
})