const express = require('express')
const {sendCode} = require("../middleware/twillo.js"); 
const {createRecord, getRecordsByNumber,updateUserRecord,removeRecord } = require("../db/queries/verify.js")
const {decrypt} = require('../middleware/index.js')
require('dotenv').config()
const router = express.Router();

// function verifies user whatsapp number
router.post('/',async(req,res) => {

    // number
    const {number} = req.body;
        
    // checks if number is regsitered
    const userData = await getRecordsByNumber(number,'verification-table');

    

    // if number is registered, mnessage is sent to client
    if(userData?.status) {
        res.status(409).json({
            message: 'registered'
        })
    }

    // check if number is not registered and sends verification to user
    if(!userData?.status){
        const data = await sendCode(number); 
        await createRecord(data,'verification-table',res)
    }   
})


// function checks for user codes and updates user information
router.put('/:number', async (req,res)=> {
    const {number}= req.params
    const {code} = req.body;

    // gets user record using user phone number
    const data = await getRecordsByNumber(number,'verification-table'); 

    // encrypted data is consumed and real code is emitted
    const decryptedCode = decrypt(data);
    
    // checks if user inputted code equals the decrypted code
    decryptedCode == code ? updateUserRecord(number,'verification-table',res) : res.status(409).json(
        {message:'code does not match'}
    )

})


// deletes a single item from a dyanamo Database
router.delete('/:number', async(req,res)=> {
    const {number} = req.params; 
    await removeRecord(number,'verification-table',res)
})


module.exports = router;