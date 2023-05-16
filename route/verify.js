const {param} = require ('../db/config.js')
const express = require('express')
const {verificationMessage} = require("../middleware/twillo.js"); 
const {createRecord} = require("../db/queries/verify.js")
require('dotenv').config()
const router = express.Router();



// twillo credentials as global variables


// function verifies user whatsapp number
router.post('/',async(req,res) => {

    // whatsapp_number
    const {whatsapp_number} = req.body;

    // provision DB 
    // const isNumberVerified = await checkUserbyNumber(whatsapp_number);
    // if(isNumberVerified) res.status(400).send('already connected');

    // turn it to hash numbers 
    const hashedData =  verificationMessage(whatsapp_number);
    const data = await createRecord(hashedData); 
    console.log(data)
})


router.get('/', async(req,res)=> {
    const {whatsapp_number} = req.params
})

router.put('/update', async (req,res)=> {
})

router.delete('/delete', async(req,res)=> {

})


module.exports = router;