// Rename this file to UserPool.js and replace the placeholder values with your actual AWS Cognito User Pool configuration.

import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'YOUR_AWS_USER_POOLS_ID',
    ClientId: 'YOUR_AWS_USER_POOLS_WEB_CLIENT_ID',
};

export default new CognitoUserPool(poolData);
