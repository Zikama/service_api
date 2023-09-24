const { scheduler } = require("../db/config");
const {
  saveReminderItem,
  saveReminderUsage,
} = require("../db/queries/schedule");

// setting two reminders
const scheduleBillingReminder = async (data, res) => {
  try {
    // create a params that sends a message 10 minutes after a message is invoked
    const payload = {
      FlexibleTimeWindow: {
        Mode: "OFF",
      },
      Name: data.bus,
      ScheduleExpression: data.rate,
      Target: {
        Arn: `arn:aws:lambda:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:function:reminder`,
        RoleArn: `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/scheduler_role`,
        Input: JSON.stringify(data),
        RetryPolicy: {
          MaximumEventAgeInSeconds: 300,
          MaximumRetryAttempts: 1,
        },
      },
      ScheduleExpressionTimezone: "Europe/London",
    };

    return scheduler.createSchedule(payload, async (err) => {
      if (err) {
        console.trace("error creating scheduler", err.message);
          return res.status(409).json({ message: err.message });
      }
      // save reminder
      await saveReminderItem(data, "reminders");
      // calculate reminders usage
      saveReminderUsage(data, "reminders");
      return res.status(200).json({ ok: true });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  scheduleBillingReminder,
};
