const { eventBridge } = require('../db/config');

const scheduleBillingReminder = async(data) => {
    const params = {
        Entries:[
            {
                Source:'my.application',
                DetailType:'BillingReminders', 
                Detail:JSON.stringify(data),
                EventBusName:'BillingReminders'

            }
        ]
    }
    try{
        eventBridge.putEvents(params, (err,data)=> {
            if(err) return 'error sending event'
            console.log(data);
        })

    }catch(error){

    }
}


module.exports = {
    scheduleBillingReminder
}