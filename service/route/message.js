const express = require('express')
const router = express.Router(); 
const { asyncWrapper } = require('../middleware/index'); 
const { getRecordBySid } = require("../db/queries/message")
const {UserResponse} = require("../middleware/messages")

const { MessagingResponse } = require('twilio').twiml;

router.post('/', asyncWrapper(async(req,res)=> {
    try{
        const {Body} = req.body;
        
        const response = new UserResponse(Body)

        const userResponse = response.getResponse()

        console.log(userResponse); 
     
        const message = new MessagingResponse().message(userResponse);

        res.set('Content-Type','text/xml')
        res.send(message.toString()).status(200)

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}))

module.exports = router 