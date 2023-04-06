import AWS from 'aws-sdk';
const { CognitoIdentityServiceProvider } = AWS;

const REGION = 'YOUR_AWS_COGNITO_REGION';
const USER_POOL_ID = 'YOUR_AWS_USER_POOLS_ID';

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({ region: REGION });

const handler = async (event) => {
  const username = JSON.parse(event.body).username;

  const params = {
    ClientId: 'YOUR_AWS_USER_POOLS_WEB_CLIENT_ID',
    Username: username,
  };

  try {
    await cognitoIdentityServiceProvider.resendConfirmationCode(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Verification code resent successfully.' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred while resending the verification code.' }),
    };
  }
};

export { handler };
