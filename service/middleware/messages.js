
const {updateServiceType,deleteService } = require('../db/queries/message')

  // sends response to user message
function processResponse(userId,serviceName,Body,serviceType){

    let message

    // TODO turn message to level, 
    // Having string is dirty and can easily break

    switch(Body){
        case "Cancel for me":
            message = autoCancelMessage()
            break;
        case "I'm subcribing": 

            let isServiceUpdated = true;
            
            if(serviceType === 'Free trial'){
                isServiceUpdated  = updateServiceType(userId,serviceName); 
                message = serviceUpdateMessage(serviceName)
            }
        
            if(!isServiceUpdated){
                return 'sorry we are unable to process your request, one of our team member will reach out to you. '
            }

    
            // return message
            break; 
        case "I cancelled myself":
            let isServiceDeleted = deleteService(userId,serviceName)
            if(isServiceDeleted){
                message = serviceRemovalMessage(serviceName);
            }
        break
        default: 
         message = defaultMessage()
         break; 
    }

    return message; 
}


const autoCancelMessage = () => {
    return `We are currently unable to cancel your subscription. Please apply for our business virtual cards to cancel your subscriptions from here. Kindly email cards@joineconome.com to get started. `
}

const serviceUpdateMessage = (serviceName) => {

   return `We have successfully registered ${serviceName} as a subscription. We would like to know if you want us to remind you about your next billing. `

}

const serviceRemovalMessage = (serviceName) => {

    return `We have successfully removed ${serviceName} from your expense history. We would like to know if you want us to remind you about your next billing. `
}

// messages shown when a user sends no predefined message
// TODO: we could leverage GPT style queries to unders what message is coming from users and respond based on the data of the user. 
const defaultMessage = () => {
    return `Thanks for reaching out to us; a team member will respond in a few minutes.`
}

module.exports = {
    processResponse
}



