const express = require('express')
const router = express.Router(); 
const {asyncWrapper} = require('../middleware/index')
const data = require("../test/data.json")
const {checkUserStatus, saveReminderItem} = require('../db/queries/schedule')


// routes sets reminder cron jobs for user registered services
router.post('/', asyncWrapper(async(req,res)=> {
    
        // const { data } = req.body; 
        const isUserVerified = await checkUserStatus(data[0]); 

        // checks if userstatus is false 
        if(!isUserVerified) res.status(409).json({ message:'record not found'});


        if(isUserVerified)
        {
            const eventData = await saveReminderItem(data[0],'reminders');
            
        }


            // trigger aws event bridge


            res.status(200).json({
                ok:true
            })


        // save reminder to DB
        // 
}))

// route to return number of scheduled services to UI
router.get('/', asyncWrapper(async(res,req)=> {
     
}))



module.exports = router 