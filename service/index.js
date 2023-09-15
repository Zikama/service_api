const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const {verifyUser, scheduleReminder, handleMessages } = require('./route')
const cookieParser = require('cookie-parser');
require('dotenv').config(); 


// initiate express
const app = express();
let db; 

const PORT = process.env.PORT



// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors()); 


app.use((req,res,next)=>{
    next();
}); 



app.use('/verify',verifyUser)
app.use('/schedule', scheduleReminder )
app.use('/message', handleMessages)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})