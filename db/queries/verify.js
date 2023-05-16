const  {docClient} = require("../config.js");


// create new items 
const createRecord = async(data,tableName) => {
    const {id,number,vi,content} = data
    const params = {
        TableName: tableName,
        Item:{
            number:number,
            id:id,
            vi:vi,
            content:content
        }
    }
    try{
        docClient.put(params, (err,data)=> {
            if(err){
                console.log('Unable to add item. Error JSON:', JSON.stringify(err,null,2));
            }else{
                console.log('Added item:', JSON.stringify(data, null, 2));
            }
        })
    }catch(err){
        console.log(err)
    }
}

// checkRecord with user number
const getRecordsByUser = async(number,tableName)=> {
    try{

        const params = {
            TableName: tableName,
            Key:{
                'number': number 
            }
        }

        docClient.get(params, (err,data)=> {
            if(err){
                console.error("unable to read item. Error JSON:",JSON.stringify(err, null, 2))
            }else {
                console.log(data.Item)
                return data.Item
            }
        })

    }catch(error){
        console.error(error.messsage)
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
    getRecordsByUser,

}
