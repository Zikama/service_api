const { scheduler } = require('../db/config');


// setting two reminders
const scheduleBillingReminder = async(data) => {

    // create a params that sends a message 10 minutes after a message is invoked
    const payload = {
        FlexibleTimeWindow: {
            Mode: 'OFF',
          },
          Name: 'test_scheduler',
          ScheduleExpression: 'rate(5 minutes)',
          Target: {
            Arn: `arn:aws:lambda:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:function:reminder`,
            RoleArn: `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/scheduler_role`,
            Input: JSON.stringify(data),
            RetryPolicy: {
              MaximumEventAgeInSeconds: 300,
              MaximumRetryAttempts: 1,
            },
          },
          ScheduleExpressionTimezone: 'Europe/London',
          StartDate:data.firstReminder,
          EndDate:data.endReminder
    }

    try{
        scheduler.createSchedule(payload, (err,response)=> {
            if(err){
              console.log(err)
            } 
            console.log(response);
        })

    }catch(error){
        console.log(error.message)
    }
}


module.exports = {
    scheduleBillingReminder
}