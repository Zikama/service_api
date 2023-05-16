const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-2'});

const dynamoDb = new AWS.DynamoDB({apiVersion:'2012-08-10'})
const docClient = dynamoDb.DocumentClient; 

require("dotenv").config();

const param = (data)=>{
    return  {
     TableName:'serviceDb-dev',
     Item:data
     }
}

module.exports= {
    param,
    dynamoDb,
    docClient
}