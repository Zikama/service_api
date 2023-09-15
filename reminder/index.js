/**
 * TODO:still incomplete
 * lambda function Js sends schedules messages using AWS eventBridge scheduler see eventbridge.js file.
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
const updateReminderRecord = async(bus,sid)=> {

    const params = {
        TableName:'reminders',
        Key:{bus:bus},
        UpdateExpression: 'set #sid = :sid',
        ExpressionAttributeNames:{'#sid': 'sid'},
        ExpressionAttributeValues:{
            ':sid': sid
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

const getUserReminder = async(bus) => {


    const params = {
        TableName:'reminders',
        Key:{
            bus:bus,
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
    try{
        const payLoad = await getUserReminder(event.bus)

        // sends message to user and returns message SID
        const messageSid = await twilioClient.messages.create({
            from:'whatsapp:'+process.env.TWILLO_NO,
            body:`Hi ${payLoad.postedBy}, you have an upcoming billing for your ${payLoad.serviceType} on *${payLoad.name}* which is scheduled to due in ${payLoad.days}. Kindly respond with your desired actions for this billing.`,
            to:'whatsapp:'+payLoad.number
        }).then( message => {
            return message.sid
        });

      const isReminderUpdated =  await updateReminderRecord(payLoad.bus,messageSid);

      if(isReminderUpdated)
      {
        const payload = {Name:`${payLoad.bus}`};
        await scheduler.deleteSchedule(payload).promise();


        return{
            statusCode: 200,
            body: JSON.stringify({
                message: 'success'
            })
        }
      }

    }catch(error){
        console.log(error)
    }
}