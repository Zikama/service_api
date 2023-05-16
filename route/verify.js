const {param} = require ('../db/config.js')
const express = require('express')
const {verificationMessage} = require("../middleware/twillo.js"); 
const {createRecord, getRecordsByUser} = require("../db/queries/verify.js")
require('dotenv').config()
const router = express.Router();



// twillo credentials as global variables


// function verifies user whatsapp number
router.post('/',async(req,res) => {

    // whatsapp_number
    const {whatsapp_number} = req.body;

    // provision DB 
    const isNumberVerified = await getRecordsByUser(whatsapp_number,'verification-table');
    if(isNumberVerified) res.status(400).send('already connected');

    // turn it to hash numbers 
    await verificationMessage(whatsapp_number).then((data)=> {
       if(data != undefined)createRecord(data,'verification-table')
    })
        
})


router.get('/', async(req,res)=> {
    const {whatsapp_number} = req.params
})

router.put('/update', async (req,res)=> {
})

router.delete('/delete', async(req,res)=> {

})


module.exports = router;