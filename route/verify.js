const express = require('express')
const {sendCode} = require("../middleware/twillo.js"); 
const {createRecord, getRecordsByUser,updateUserRecord,removeRecord } = require("../db/queries/verify.js")
const {decrypt} = require('../middleware/transformer.js')
require('dotenv').config()
const router = express.Router();

// function verifies user whatsapp number
router.post('/',async(req,res) => {

    // number
    const {number} = req.body;
        
    // checks if number is regsitered
    const isNumberRegistered = await getRecordsByUser(number,'verification-table');

    // if number is registered, mnessage is sent to client
    if(isNumberRegistered) {
        res.status(409).json({
            message: "Number already registered"
        })
    }

    // check is number is not registered and sends verification to user
    if(!isNumberRegistered){
        const data = await sendCode(number); 
        await createRecord(data,'verification-table',res)
    }   
})


// function checks for user codes and updates user information
router.put('/:number', async (req,res)=> {
    const {number}= req.params
    const {code} = req.body;

    // gets user record using user phone number
    const data = await getRecordsByUser(number,'verification-table'); 

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