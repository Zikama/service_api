const express = require('express')
const router = express.Router(); 
const {asyncWrapper} = require('../middleware/index')
// const data = require("../test/data.json")
const {checkUserStatus} = require('../db/queries/schedule'); 
const {scheduleBillingReminder} = require('../middleware/eventbridge')


// routes sets reminder cron jobs for user registered services
router.post('/', asyncWrapper(async(req,res)=> {
    
    try{    
        const data  = req.body; 
        const userNumber = data.number

        const isUserVerified = await checkUserStatus(userNumber); 

        // checks if userstatus is not verified
        if(!isUserVerified) res.status(409).json({ message:'record not found'});

        // // saves reminder to scheduler 
        await scheduleBillingReminder(data,res)


    }catch(error){
        res.status(500).json(
            {
                messsage:error.message
            }
        )
    }
}))

module.exports = router 