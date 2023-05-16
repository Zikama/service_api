const  {dynamoDb,param} = require("../config.js");


// create new items 
const createRecord = async (data)=> {
    try{
        const params = param(data);
        await dynamoDb.putItem(params).promise()
        return {body:JSON.stringify(params)}
    }catch(err){
        console.log(err)
    }
}

// checkRecord with user number
const getRecordsByUser = async(number)=> {
    try{

    }catch(error){

    }
}


// update items
const updateRecord = async(data)=> {
    try{



    }catch(error){
        console.error(error.messsage)
    }
}

// delete items
const removeRecord = async(data)=> {

}

module.exports = {
    createRecord,

}
