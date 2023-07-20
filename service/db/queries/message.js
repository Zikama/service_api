const  {docClient} = require("../config.js");

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

module.exports = {
    getRecordBySid
}