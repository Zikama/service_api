require('dotenv').config();
const  twilio =  require('twilio')
const cryptoRandomString = require('crypto-random-string'); 
const {encrypt,decrypt} = require('../middleware/transformer')

const accountSid = process.env.TWILLO_SID;
const authToken = process.env.TWILLO_TOKEN;
const twilioClient = new twilio(accountSid,authToken)


const verificationMessage = (number)=> {

    // generate random 6 digital numeric code
    const code = cryptoRandomString({length:6,type:'numeric'})

    // send verification 
    twilioClient.messages.create({
        from:`whatsapp:${process.env.TWILLO_NO}`,
        body:
        `SaveSphere: ${code} is your verification code. \nDon't share your code.`,
        to:`whatsapp:${number}`
    }).then(message => {
        let data = encrypt(code); 
        data['id'] = message.sid;
        data['number'] = number
        return data;
    })

}

module.exports = {
    verificationMessage
}