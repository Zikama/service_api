
const {updateServiceType,deleteService } = require('../db/queries/message')

  // sends response to user message
function processResponse(userId,serviceName,Body,serviceType,ends){

    let message

    // TODO turn message to level, 
    // Having string is dirty and can easily break

    switch(Body){
        case "Cancel for me":
            message = autoCancelMessage()
            break;
        case "I am subscribing":

            const isServiceUpdate = updateServiceType(userId,serviceName,ends)

            if(!isServiceUpdate) return 'Sorry we are unable to update your subscription, kindly try again.'

            message = serviceUpdateMessage(serviceName, serviceType)
          
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
    return `We are currently unable to cancel your subscription. Please apply for our virtual card to cancel your subscriptions from here. Get started here: https://bit.ly/3Pr0Cxl `
}

const serviceUpdateMessage = (serviceName,serviceType) => {
    const message = serviceType === 'trial' ? `We have successfully registered ${serviceName} as a subscription. ` : `We have successfully rolled over ${serviceName} as an expense for the coming months. `

   return message
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



