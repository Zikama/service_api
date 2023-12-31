require('dotenv').config();
const  twilio =  require('twilio')
const cryptoRandomString = require('crypto-random-string'); 
const {encrypt} = require('.')

const accountSid = process.env.TWILLO_SID;
const authToken = process.env.TWILLO_TOKEN;
const twilioClient = new twilio(accountSid,authToken)

// function sends a six-digit verification to user 
const sendCode = async (number)=> {

    try{
        const code = cryptoRandomString({length:6,type:'numeric'});
        // send verification code
       const sid = await  twilioClient.messages.create({
            from:`whatsapp:${process.env.TWILLO_NO}`,
            body:`*${code}* is your verification code. For your security, do not share this code.`,
            to:`whatsapp:${number}`
        }).then((message) => message.sid)
        console.trace('code sent here')
        let data = encrypt(code); 
        data['id'] = sid;
        data['number'] = number
        data['status'] = false;
        return data;

    }catch(error){
        console.error(error);
    }

} 



module.exports = {
    sendCode
}