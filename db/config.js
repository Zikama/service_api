const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-2'});

const dynamoDb = new AWS.DynamoDB({apiVersion:'2012-08-10'})
const docClient = new AWS.DynamoDB.DocumentClient(); 

require("dotenv").config();

const param = (data)=>{
    const {id,number,iv,content} = data
    return  {
     TableName:'serviceDb-dev',
     Item:{
        id:id,
        number:number,
        iv:iv,
        content:content
     }
     }
}

module.exports= {
    param,
    dynamoDb,
    docClient
}