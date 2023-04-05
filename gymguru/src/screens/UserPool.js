import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-west-1_oVtpvDMfg',
  ClientId: '78qrhubalshetm8if5c57las12',
};

export default new CognitoUserPool(poolData);
