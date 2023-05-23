const express = require('express')
const morgan = require('morgan')
const {verifyUser, scheduleReminder } = require('./route')
const cookieParser = require('cookie-parser');
require('dotenv').config(); 


// initiate express
const app = express();

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use((req,res,next)=>{
    next();
}); 

app.use('/verify',verifyUser)
app.use('/schedule', scheduleReminder )

