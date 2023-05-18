const  {docClient} = require("../config.js");


// create new items 
const createRecord = async(data,tableName,res) => {
    const {id,number,iv,content,status} = data
    const params = {
        TableName: tableName,
        Item:{
            number:number,
            id:id,
            iv:iv,
            content:content,
            status:status 
        }
    }
    try{
        const data = await docClient.put(params).promise()
        console.log('Added item:', JSON.stringify(data, null, 2));
        res.status(200).json({ok:true});

    }catch(err){
        console.log('Unable to add item. Error JSON:', JSON.stringify(err,null,2));
        res.status(500).json({
            message: "error registering Number"
        });
    }
}

// checkRecord with user number
const getRecordsByUser = async (number,tableName)=> {
    const params = {
        TableName: tableName,
        Key:{
            number: number
        }
    }

    try{
        const data = await docClient.get(params).promise()
        return data.Item;

    }catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

// verifies decrypted token against user inputted code
const updateUserRecord = async(number,tableName,res)=> {

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
        res.status(200).json({ok:true})
    }catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
        res.status(500).json({message:"Unable to read item"})
    }
}

// delete user items 
const removeRecord = async(number,tableName, res)=> {
    const params = {
        TableName:tableName,
        Key: {
            number:number,
        }
    }
    try{
        docClient.delete(params, (error,data)=> {
            console.log(params);
            if(error){
                
            }
            res.status(200).json({
                ok:true
            })
        })

    }catch(erorr){
        console.error("unable to read item. Error JSON:",JSON.stringify(error, null, 2))
        res.status(500).json({message:erorr})
    }

}

module.exports = {
    createRecord,
    getRecordsByUser,
    updateUserRecord,
    removeRecord
}
