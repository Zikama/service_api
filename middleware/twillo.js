require('dotenv').config();
const  twilio =  require('twilio')
const cryptoRandomString = require('crypto-random-string'); 
const {encrypt} = require('../middleware/transformer')

const accountSid = process.env.TWILLO_SID;
const authToken = process.env.TWILLO_TOKEN;
const twilioClient = new twilio(accountSid,authToken)


const sendCode = async (number)=> {

    try{
        const code = cryptoRandomString({length:6,type:'numeric'});
        // send verification code
       const sid = await  twilioClient.messages.create({
            from:`whatsapp:${process.env.TWILLO_NO}`,
            body:
            `SaveSphere: ${code} is your verification code. \nDon't share your code.`,
            to:`whatsapp:${number}`
        }).then((message) => message.sid)
        let data = encrypt(code); 
        data['id'] = sid;
        data['number'] = number
        data['status'] = 'unverified';
        return data;

    }catch(error){
        console.error(error);
    }

    // generate random 6 digital numeric code

} 

module.exports = {
    sendCode
}