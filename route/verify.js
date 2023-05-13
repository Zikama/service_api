import express from 'express';
import twillo from 'twillo';
import crypto from 'crypto-random-string'




// twillo credentials as global variables
const {TWILLO_SID,TWILLO_TOKEN} = process.env
const twilloClient = twillo(TWILLO_SID,TWILLO_TOKEN)
const router = express.Router();


// function verifies user whatsapp number
export default router.post('/verify',async(req,res) => {
    const {whatsapp_number} = req.body

    // provision DB 
    const isNumberVerified = await checkNumber(whatsapp_number);

    if(isNumberVerified) res.status(400).send('already connected')

    if(!isNumberVerified)
    {
        const randomString = crypto.randomString(6);
        twilloClient.create({
            from:'whatsapp:+4456979379',
            body:'Your Chimp-tracker code is'+randomString
        }).then(()=>{
            
        })
        // save verified number here
        // save code and phone number to DB
    }

})