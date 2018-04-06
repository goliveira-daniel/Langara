'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

module.exports.scan = (event, context, callback) => {
	event.Records.forEach((record) => {
		console.log(`New audio file detected: ${record.s3.object.key} (${record.s3.object.size} bytes)`);
		return dynamo.putItem({
			'TableName': 'wmdd4999-assignment03',
			'Item' : {
				'FileName': {'S': record.s3.object.key},
				'EventTime': {'S': record.eventTime},
				'id': record.s3.object.sequencer
			}
		}, (error) => {
			// handle potential errors
			if (error) {
				console.error(error);
				callback(null, {
					statusCode: error.statusCode || 501,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Couldn\'t create the todo item.',
				});
				return;
			}
		});
	});
};
