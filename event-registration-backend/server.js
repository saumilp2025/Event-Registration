
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();

const EVENTS_TABLE_NAME = process.env.EVENTS_TABLE_NAME;
const REGISTRATIONS_TABLE_NAME = process.env.REGISTRATIONS_TABLE_NAME;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const AWS_REGION = process.env.AWS_REGION;

AWS.config.update({ region: AWS_REGION });

exports.handler = async (event) => {
  const { httpMethod, path } = event;

  if (httpMethod === 'GET' && path === '/events') {
    return getEvents();
  } else if (httpMethod === 'POST' && path === '/register') {
    return registerUser(JSON.parse(event.body));
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Route not found' }),
    };
  }
};

async function getEvents() {
  const params = {
    TableName: EVENTS_TABLE_NAME,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch events' }),
    };
  }
}

async function registerUser(body) {
  const { name, email, eventId } = body;

  const registrationItem = {
    registration_id: `${Date.now()}-${Math.random()}`,
    event_id: eventId,
    name,
    email,
    registered_at: new Date().toISOString(),
  };

  const params = {
    TableName: REGISTRATIONS_TABLE_NAME,
    Item: registrationItem,
  };

  try {
    await dynamoDb.put(params).promise();

    await ses.sendEmail({
      Source: SENDER_EMAIL,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: 'Registration Confirmation' },
        Body: { Text: { Data: `Thank you for registering for event ${eventId}!` } },
      },
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Registration successful' }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not register user' }),
    };
  }
}
