const { scheduler } = require('../db/config');


// setting two reminders
const scheduleBillingReminder = async(data) => {

    // create a params that sends a message 10 minutes after a message is invoked
    const params = {
        FlexibleTimeWindow: {
            Mode: 'OFF',
          },
          Name: 'test_scheduler',
          ScheduleExpression: 'rate(30 minutes)',
          Target: {
            Arn: `arn:aws:lambda:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:function:reminder`,
            RoleArn: `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/Scheduler_Role`,
            Input: JSON.stringify(data),
            RetryPolicy: {
              MaximumEventAgeInSeconds: 300,
              MaximumRetryAttempts: 1,
            },
          },
          ScheduleExpressionTimezone: 'BST',
          StartDate:data.firstReminder,
          EndDate:data.endReminder
    }

    try{
        scheduler.createScheule(params, (err,data)=> {
            if(err) return 'error sending event'
            console.log(data);
        })

    }catch(error){

    }
}


module.exports = {
    scheduleBillingReminder
}