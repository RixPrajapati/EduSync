import Express from'express'
import config  from './config/config.js';
import userRouter from './routes/user.route.js';
import authRouter from"./routes/auth.route.js"
import dataBaseConnection from './config/dbConnection.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app=Express();


dataBaseConnection()
app.use(bodyParser.json())
app.use(cookieParser())



app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.listen(config.port,()=>{
    console.log("Server started at 9090");
})