import express from 'express';
import cookieParser from 'cookie-parser';
import  logger from 'morgan' 
import {verify} from './route/verify'

// initiate express
const app = express(); 
const {PORT} = process.env;


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

// middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use((req,res,next)=>{
    req.io=io;
    next();
})


app.use('/verify',verify)

