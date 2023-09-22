const express = require('express')
const router = express.Router(); 
const { asyncWrapper } = require('../middleware/index'); 
const {getRecordBySid} = require('../db/queries/message')
const {processResponse} = require("../middleware/messages")

const { MessagingResponse } = require('twilio').twiml;

router.post('/', asyncWrapper(async(req,res)=> {
    try{
        const {Body,OriginalRepliedMessageSid} = req.body;

    
        // get service from user record from DynamoDB
        const {userId,name, serviceType,ends} = await getRecordBySid(OriginalRepliedMessageSid);
        
    
        // get user service and process response based on user response 
        // subscription moves it to subscription 
        // I cancelled removes subscription 
        const messageResponse = processResponse(userId,name,Body,serviceType,ends);

        const message = new MessagingResponse().message(messageResponse);

        res.set('Content-Type','text/xml')
        res.send(message.toString()).status(200)

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}))

module.exports = router 