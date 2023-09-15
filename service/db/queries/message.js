const  {docClient, ClientPromise} = require("../config.js");

const getRecordBySid = async(sid)=> {
    const params = {
        TableName:"reminders",
        IndexName:'sid-index', 
        KeyConditionExpression: '#sid = :sid_value',
        ExpressionAttributeNames : {
            '#sid': 'sid'
        }, 
        ExpressionAttributeValues:{
            ':sid_value': sid
        }

    }

    try{
        const data = await docClient.query(params).promise();
        return data.Items[0] 
    }catch(error){
        console.log(error);
    }
    
}

// updates service types by taking userId and name of service
const updateServiceType = async(postedBy,name) => {
    const db = (await ClientPromise).db(); 
    try{
       
    
    // find service by user id (posted by and service name)
    // updates serviceType from free trials to subscriptions
    db.collection("userTrials").findOneAndUpdate({
        $and:[
            {postedBy:postedBy}, 
            {name:name}
        ]}, {
            $set:{
                serviceType:"subscription", 
            }
        }, {upsert:true})

    return true;

    }catch(error){
        console.error("unable to find and update user service:", error); 
        return false
    }
     

}

const deleteService = async(postedBy,name)=> {
    const db = (await ClientPromise).db(); 
    try{

        // checks for services that matches the servicename and user postedby Id
        // and removes service from document
        db.collection("userTrials").deleteOne({
            $and : [
                {postedBy: postedBy},
                {name:  name}
        ]})


    }catch(error){
        console.log('unable to remove service:',error)
        return false
    }

}

module.exports = {
    getRecordBySid,
    updateServiceType,
    deleteService
}