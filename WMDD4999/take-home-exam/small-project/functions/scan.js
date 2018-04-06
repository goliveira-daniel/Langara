"use strict";

const uuid = require("uuid");
// const doc = require("dynamodb-doc");
// const dynamo = new doc.DynamoDB();
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.scan = (event, context, callback) => {
  const timestamp = new Date().getTime();
  let params = {};

  event.Records.forEach(record => {
    params = {
      TableName: process.env.AUDIO_DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        FileName: record.s3.object.key,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };

    dynamoDb.put(params, error => {
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { "Content-Type": "text/plain" },
          body: "Couldn't create the playlist item."
        });
        return;
      }
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
      };
      callback(null, response);
    });
  });
};
