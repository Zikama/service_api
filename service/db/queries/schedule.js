const {getRecordsByNumber} = require("../queries/verify.js")
const  {docClient} = require("../config.js");

// function checks if gets users record by number and 
const checkUserStatus = async(number)=> {
    try{
        const userItem = await getRecordsByNumber(number,'verification-table');
        return userItem.status

    }catch(error){
        return false
    }
   

}

// functions saves reminder item to table
const saveReminderItem = async(data,tableName)=> {
    const {name,postedBy,number,domain,bus,rate, days, serviceType,userId,starts,ends} = data

    const params = {
        TableName: tableName,
        Item:{
            number:number,
            name:name,
            postedBy:postedBy,
            domain:domain,
            sid: bus, // temporary SID 
            rate:rate,
            bus:bus, 
            days:days,
            serviceType:serviceType,
            userId:userId,
            starts:starts,
            ends:ends
        }
    }


   Promise.resolve(docClient.put(params).promise()).then(()=> {
        console.log('Added items');
    });
      
 

}

module.exports = {
    checkUserStatus,
    saveReminderItem
}