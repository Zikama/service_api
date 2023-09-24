const { getRecordsByNumber } = require("../queries/verify.js");
const { docClient, ClientPromise } = require("../config.js");
const { MongoClient, ObjectId } = require("mongodb");

// function checks if gets users record by number and
const checkUserStatus = async (number) => {
  try {
    const userItem = await getRecordsByNumber(number, "verification-table");
    return userItem.status;
  } catch (error) {
    return false;
  }
};

// functions saves reminder item to table
const saveReminderItem = async (data, tableName) => {
  const {
    name,
    postedBy,
    number,
    domain,
    bus,
    rate,
    days,
    serviceType,
    userId,
    starts,
    ends,
  } = data;

  const params = {
    TableName: tableName,
    Item: {
      number: number,
      name: name,
      postedBy: postedBy,
      domain: domain,
      sid: bus, // temporary SID
      rate: rate,
      bus: bus,
      days: days,
      serviceType: serviceType,
      userId: userId,
      starts: starts,
      ends: ends,
    },
  };

  Promise.resolve(docClient.put(params).promise()).then(() => {
    console.log("Added items");
  });
};

const saveReminderUsage = async (data) => {
    
  try {
    const db = (await ClientPromise).db()
      const user = await db.collection('users').findOne({_id: new ObjectId(data.userId)});
      

      let trialLimits = await db.collection('trialLimits').findOne({
        $or: [{
            userId: data?.userId ?? user._id,
        }, {
            userEmail: data?.userEmail ?? user?.email,
        }]
    });

      // TODO: add trial usuage
    if (user?.premium === false && trialLimits) {
      db.collection("trialLimits").findOneAndUpdate(
        {
          $or: [{ userId: data.userId }, { userEmail: data?.email||user?.email }],
        },
        {
          $set: {
            schedulers: {
              ...trialLimits.schedulers,
              used: (trialLimits?.schedulers?.used ?? 0) + 1,
            },
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkUserStatus,
  saveReminderItem,
  saveReminderUsage,
};
