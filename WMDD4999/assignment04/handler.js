const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_FROM = process.env.TWILIO_PHONE_FROM
const TWILIO_PHONE_TO = process.env.TWILIO_PHONE_TO
const request = require('request-promise-native')

module.exports.sendSms = (event, context, callback) => {
    request.post({
        url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
        json: true,
        'auth': {
            'user': TWILIO_ACCOUNT_SID,
            'pass': TWILIO_AUTH_TOKEN
        },
        form: {
            From: TWILIO_PHONE_FROM,
            To: TWILIO_PHONE_TO,
            Body: `the new file ${event.Records[0].s3.object.key} was added to your S3 bucket`
        }
    })
    .then((data) => {
        console.log(`Message successfully sent through SMS to ${TWILIO_PHONE_TO}`)
        return callback(null, true)
    })
    .catch((err) => {
        console.error(err)
        return callback(err)
    })
}; 