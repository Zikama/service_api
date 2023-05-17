const  {docClient} = require("../config.js");


// create new items 
const createRecord = async(data,tableName) => {
    const {id,number,iv,content} = data
    const params = {
        TableName: tableName,
        Item:{
            number:number,
            id:id,
            iv:iv,
            content:content
        }
    }
    try{
        const data = docClient.put(params).promise()
        console.log('Added item:', JSON.stringify(data, null, 2));

    }catch(err){
        console.log('Unable to add item. Error JSON:', JSON.stringify(err,null,2));
    }
}

// checkRecord with user number
const getRecordsByUser = async (number,tableName)=> {
    const params = {
        TableName:'verification-table',
        Key:{
            number:'+44546979379'
        }
    }

    try{
        const data = await docClient.get(params).promise()
        return data.Item;

    }catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    }
}


// update items
const updateUserRecord = async(number,tableName)=> {

    const params = {
        TableName:tableName,
        Key:{
            number:number,

        },
        UpdateExpression:'set #status = :status remove #iv,#content ',
        ExpressionAttributeNames:{
            '#status': 'status',
            '#iv': 'iv',
            '#content': 'content'
        },
        ExpressionAttributeValues:{
            ':status': 'verified'
        }, 
        ReturnValues:'UPDATED_NEW'
    }

    try{
        const data = await docClient.update(params).promise(); 
        console.log('Updated item:', JSON.stringify(data, null, 2));
    }catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    }
}

// delete items
const removeRecord = async(number,tableName)=> {
    const params = {
        TableName:tableName,
        Key: {
            number:number,

        }
    }
    try{
        docClient.delete(params, (error,data)=> {
            if(error){
                console.error("unable to read item. Error JSON:",JSON.stringify(error, null, 2))
            }
            console.log({body: JSON.stringify(data)})
        })

    }catch(erorr){
        console.error(erorr)
    }

}

module.exports = {
    createRecord,
    getRecordsByUser,
    updateUserRecord,
    removeRecord

}
