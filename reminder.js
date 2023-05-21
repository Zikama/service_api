const  twilio =  require('twilio');
require("dotenv").config();

// dynamoDB config
AWS.config.update({region:'eu-west-2'});
const dynamoDb = new AWS.DynamoDB({apiVersion:'2012-08-10'})
const docClient = new AWS.DynamoDB.DocumentClient(); 

// twilio env variables
const accountSid = process.env.TWILLO_SID;
const authToken = process.env.TWILLO_TOKEN;

// new twilio client
const twilioClient = new twilio(accountSid,authToken)

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




exports.handler = async(event)=> {

    // get data from db
    const getReminder = await getUserReminder(event.detail);

    await twilioClient.messages.create({
        from:`whatsapp:${process.env.TWILLO_NO}`,
        body:
        `SaveSphere: ${code} is your verification code. \nDon't share your code.`,
        to:`whatsapp:${number}`
    }).then((message) => {
    
    
    })
    


    
    // construct message
    // craft message and send
    // update data from db
    

  
}