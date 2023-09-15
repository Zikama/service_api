const AWS = require('aws-sdk');
const {MongoClient} = require("mongodb")
require("dotenv").config();

// add aws cridentials here 
AWS.config.update({
    region:'eu-west-2',
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY
});

const scheduler = new AWS.Scheduler();
const dynamoDb = new AWS.DynamoDB({apiVersion:'2012-08-10'})
const docClient = new AWS.DynamoDB.DocumentClient(); 

// MongoDB CONFIG FILES 
const URI= process.env.MONGO_URI;
const PORT = process.env.PORT

const options = {}

let client
let ClientPromise

if(!process.env.MONGO_URI){
    throw new Error('Please add your mongo URI')
}

if(!PORT){
    client = new MongoClient(URI,options)
    ClientPromise = client.connect(); 
}else{

   if(!global._MongoClientPromise){
       client = new MongoClient(URI,options); 
       global._mongoClientPromise = client.connect(); 
   }
   ClientPromise = global._mongoClientPromise
}

export default 








module.exports= {
    dynamoDb,
    docClient, 
    scheduler,
    ClientPromise
}