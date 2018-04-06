'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.AUDIO_DYNAMODB_TABLE,
    // KeyConditionExpression: 'contains(FileName, :queryString)', 
    FilterExpression: 'contains(FileName, :queryString)', 
    ExpressionAttributeValues: {
      ':queryString': event.pathParameters.id
     },
  };

  // scan audio from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t find the audio.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null, response);
  });
};