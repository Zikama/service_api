const data = require("../test/response.json")



class UserResponse{


    #userMessage = null;

    constructor(Body){
        this.#userMessage = Body;
    }

    // sends response to user message
    getResponse(){
        const message = this.#userMessage
        const sysResponse = data.filter(response => response?.message.toLowerCase() == message.toLowerCase())[0]; 

        if(!sysResponse){
            console.log(message); 
        }
    
        return sysResponse.response;
    }




}

module.exports = {
    UserResponse
}
