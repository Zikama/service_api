const {getRecordsByNumber} = require("../queries/verify.js")
const  {docClient} = require("../config.js");

// function checks if gets users record by number and 
const checkUserStatus = async(number)=> {
    try{
        const userItem = await getRecordsByNumber(number,'verification-table');
      if(userItem.status == 'verified') return true

    }catch(error){
        return false
    }
   

}

// functions saves reminder item to table
const saveReminderItem = async(data,tableName)=> {
    const {name,postedBy,number,domain,bus,rate, days, serviceType} = data

    const params = {
        TableName: tableName,
        Item:{
            number:number,
            name:name,
            postedBy:postedBy,
            domain:domain,
            sid:'',
            rate:rate,
            bus:bus, 
            days:days,
            serviceType:serviceType
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