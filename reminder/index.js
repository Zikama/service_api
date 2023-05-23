/**
 * TODO:still incomplete
 * lambda function Js file that sends schedules messages using AWS eventBridge scheduler see eventbridge JS
 */
require("dotenv").config();
const  twilio =  require('twilio');
const AWS = require('aws-sdk');

// dynamoDB config
AWS.config.update({region:process.env.AWS_REGION});
const docClient = new AWS.DynamoDB.DocumentClient(); 

// eventbridge scheduler
const scheduler = new AWS.Scheduler();

// twilio env variables
const accountSid = process.env.TWILLO_SID;
const authToken = process.env.TWILLO_TOKEN;
const twilioClient = new twilio(accountSid,authToken);


/**
 * 
 * DB SECTION
 */
const updateReminderRecord = async(number,sid)=> {

    const params = {
        TableName:'reminders',
        Key:{number:number},
        UpdateExpression: 'set #sid = :sid',
        ExpressionAttributeNames:{'#sid': 'sid'},
        ExpressionAttributeValues:{
            ':sid': [sid]
        }, 
        ReturnValues:'UPDATED_NEW'
    }

    try{
        await docClient.update(params).promise(); 
        return true;
    }catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

const getUserReminder = async(number) => {

    const params = {
        TableName:'reminders',
        Key:{
            number:number,
        }
    }

    try{
        const data = await docClient.get(params).promise()
        return data.Item;

    }catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
    }
    
}


/**
 * MESSAGE SECTION
 */
// first message
const firstMessage = (postedBy) => {
    return `Hi ${postedBy}, we are sending first reminder message`
}

// second message
const secondMessage = (postedBy)=> {
    return `Hi ${postedBy}, we are sending you the last message`
}


// send sms to number to remind me about a reminder
exports.handler = async(event)=> {

    try{
        const payLoad = await getUserReminder(event.number);

        // checks if a previous message is sent
        const sidLength = payLoad.sid.length 
    
        //removes eventbridge scheduler if first message is sent
        if(sidLength){
            
            const payload = {
                   Name:payLoad.bus.toString()
            };
    
            await scheduler.deleteSchedule(payload).promise();
        } 
        
        // chooses the right message based on db SID value
        const messageBody = sidLength ? secondMessage (payLoad.postedBy) : firstMessage(payLoad.postedBy);
    
        // sends message to user and returns message SID
        const messageSid = await twilioClient.messages.create({
            from:`${process.env.TWILLO_NO}`,
            body:messageBody,
            to:`${payLoad.number}`
        }).then( message => message.sid);
    
    
       updateReminderRecord(payLoad.number,messageSid).then(()=> {
            return{
                statusCode: 200,
                body: JSON.stringify({
                    message: 'success'
                })
            }
       });
    }catch(error){
        console.log(error)
    }
 

  
}