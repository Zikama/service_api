const {getRecordsByNumber} = require("../queries/verify.js")
const  {docClient} = require("../config.js");

// function checks if gets users record by number and 
const checkUserStatus = async(data)=> {
    try{
        const userItem = await getRecordsByNumber(data.number,'verification-table');
      if(userItem.status == 'verified') return true

    }catch(error){
        return false
    }
   

}

// functions saves reminder item to table
const saveReminderItem = async(data,tableName)=> {
    const {name,postedBy,number,domain,starts,ends,bus,rate} = data

    const params = {
        TableName: tableName,
        Item:{
            number:number,
            name:name,
            postedBy:postedBy,
            domain:domain,
            starts:starts,
            ends:ends,
            sid:'',
            rate:rate,
            bus:bus
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