const {getRecordsByNumber} = require("../queries/verify.js")
const  {docClient} = require("../config.js");

// function checks if gets users record by number and 
const checkUserStatus = async(data)=> {
    try{
        const userItem = await getRecordsByNumber(data.number,'verification-table');
      if(userItem.status == 'verified') return true

    }catch(error){
        throw new Error(error.message)
    }
   

}

// functions saves reminder item to table
const saveReminderItem = async(data,tableName)=> {
    const {postedBy,number,domain,starts,ends,firstReminder,secondReminder,reminderStatus} = data

    const params = {
        TableName: tableName,
        Item:{
            number:number,
            postedBy:postedBy,
            domain:domain,
            starts:starts,
            ends:ends,
            firstReminder:firstReminder,
            secondReminder:secondReminder,
            reminderStatus:reminderStatus,
            sid:''
        }
    }

    try{
        await docClient.put(params).promise();
        console.log('Added items');
        return data;
    }catch(error){
        console.log(error.message)

    }
}

module.exports = {
    checkUserStatus,
    saveReminderItem
}