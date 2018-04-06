'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  // if (typeof data.text !== 'string') {
  //   console.error('Validation Failed');
  //   callback(null, {
  //     statusCode: 400,
  //     headers: { 'Content-Type': 'text/plain' },
  //     body: 'Couldn\'t create the playlist item.',
  //   });
  //   return;
  // }
  console.log(data)
  data.songs.forEach(element => {
    dynamoDb.query({
      TableName: process.env.AUDIO_DYNAMODB_TABLE,
      // KeyConditionExpression: 'contains(FileName, :queryString)', 
      KeyConditionExpression: 'id = :queryString)',
      ExpressionAttributeValues: {
        ':queryString': element
       },
      }, (error, result) => {
        if (error || result.Count !== 1) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t find song.',
          });
          return;
        }
    })
  });
  
  


  const params = {
    TableName: process.env.PLAYLIST_DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      songs: data.songs,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the playlist to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the playlist.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};