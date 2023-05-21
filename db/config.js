const AWS = require('aws-sdk');
require("dotenv").config();

// add aws cridentials here 
AWS.config.update({region:'eu-west-2'});

const eventBridge = AWS.EventBridge()
const dynamoDb = new AWS.DynamoDB({apiVersion:'2012-08-10'})
const docClient = new AWS.DynamoDB.DocumentClient(); 




module.exports= {
    dynamoDb,
    docClient, 
    eventBridge
}