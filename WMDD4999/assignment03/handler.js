'use strict';

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

module.exports.postprocess = (event) => {
  const payload = {}
  payload.TableName = "wmdd4999-assignment03"
  event.Records.forEach((record) => {
    payload.Item.FileName.S = record.s3.object.key;
    payload.Item.FileSize.S = record.s3.object.size;
    console.log(`New .png object has been created: ${payload.Item.FileName} (${payload.Item.FileSize} bytes)`);
    dynamo.putItem(payload)
  });
};
