/**
 * TODO:still incomplete
 * lambda function Js file that sends schedules messages using AWS eventBridge scheduler see eventbridge JS
 */


const  twilio =  require('twilio');
const AWS = require('aws-sdk')
require("dotenv").config();

// dynamoDB config
AWS.config.update({region:process.env.AWS_REGION});
const docClient = new AWS.DynamoDB.DocumentClient(); 

// twilio env variables
const accountSid = process.env.TWILLO_SID;
const authToken = process.env.TWILLO_TOKEN;

// new twilio client
const twilioClient = new twilio(accountSid,authToken)

// function gets user reminder item
const getUserReminder = async(data) => {

    const params = {
        TableName:'reminders',
        Key:{
            number: data.number,
            postedBy:data.postedBy,
            name:data.name
        }
    }

    try{
        const data = await docClient.get(params).promise()
        return data.Item;

    }catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
    }
    
}

// send sms to number to remind me about a reminder
exports.handler = async(event)=> {

    // get data from dynamoDB
    const userInformation = await getUserReminder(event.detail);

    await twilioClient.messages.create({
        from:`${process.env.TWILLO_NO}`,
        body:`Hi There, we are testing scheduling stuff with twilio`,
        to:`${userInformation.number}`
    }).then((message) => {

        // update Sid; 
        // update DB that first message was sent
        // check if userinformation matches current data, if yes delete eventbridge scheduler. 
    })
    

  
}