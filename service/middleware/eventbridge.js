const { scheduler } = require('../db/config');
const {saveReminderItem} = require('../db/queries/schedule')


// setting two reminders
const scheduleBillingReminder = async(data,res) => {
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

      scheduler.createSchedule(payload, async (err)=> {
          if(err){
            console.trace('error creating scheduler')
            res.status(409).json({message: err.message})
          }else{
            await saveReminderItem(data,'reminders')
            res.status(200).json({ok: true})
          }
      })
}


module.exports = {
    scheduleBillingReminder
}