const express = require('express')
const router = express.Router(); 
const {asyncWrapper} = require('../middleware/index')
const data = require("../test/data.json")
const {checkUserStatus, saveReminderItem} = require('../db/queries/schedule'); 
const {scheduleBillingReminder} = require('../middleware/eventbridge')


// routes sets reminder cron jobs for user registered services
router.post('/', asyncWrapper(async(req,res)=> {
    
    try{    // const { data } = req.body; 
        const isUserVerified = await checkUserStatus(data[0]); 

        // checks if userstatus is false 
        if(!isUserVerified) res.status(409).json({ message:'record not found'});

        // saves reminder to scheduler 
        await scheduleBillingReminder(data[0],res)
    }catch(error){
        res.status(500).json(
            {
                messsage:error.message
            }
        )
    }
}))

// route to return number of scheduled services to UI
router.get('/', asyncWrapper(async(res,req)=> {
     
}))



module.exports = router 