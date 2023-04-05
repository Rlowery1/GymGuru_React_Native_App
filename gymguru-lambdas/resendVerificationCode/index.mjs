import AWS from 'aws-sdk';
const { CognitoIdentityServiceProvider } = AWS;

const REGION = 'us-west-1';
const USER_POOL_ID = 'us-west-1_oVtpvDMfg';

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({ region: REGION });

const handler = async (event) => {
  const username = JSON.parse(event.body).username;

  const params = {
    ClientId: '78qrhubalshetm8if5c57las12',
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
