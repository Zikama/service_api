const {param} = require ('../db/config.js')
const express = require('express')
const {sendCode} = require("../middleware/twillo.js"); 
const {createRecord, getRecordsByUser,updateUserRecord } = require("../db/queries/verify.js")
const {decrypt} = require('../middleware/transformer.js')
require('dotenv').config()
const router = express.Router();

// function verifies user whatsapp number
router.post('/',async(req,res) => {

    // whatsapp_number
    const {whatsapp_number} = req.body;
        
    // checks if number is regsitered
    const isNumberRegistered = await getRecordsByUser(whatsapp_number,'verification-table');

    // if number is registered, mnessage is sent to client
    if(isNumberRegistered) res.status(409).json({
    message: "Number already registered"
    })

    // sends verification code to user
    await sendCode(whatsapp_number).then((data)=> {
        if(data !== undefined) {
            createRecord(data,'verification-table')
            res.status(200).json(data);
        }
    })

})


// 
router.put('/:number', async (req,res)=> {
    const number = req.params
    const {code} = req.body;

    const data = await getRecordsByUser(number,'verification-table'); 
    const decryptedCode = decrypt(data);
    
    decryptedCode == code ? updateUserRecord(number,'verification-table') : res.status(409).json(
        {message:'code does not match'}
    )

})


// TODO: delete tested but waiting implementation
router.delete('/', async(req,res)=> {

})


module.exports = router;