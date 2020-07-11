import Amplify from 'aws-amplify';

export default {
  region: "us-east-1",

  IdentityPoolId: "us-east-1_AnQnT11Qd",
  UserPoolId: "us-east-1:083124225867",
  ClientId: "gdjne9f3v2hmocg511onno830"
};

const awsmobile = {
  Auth: {
    // Amazon Cognito Region
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: "us-east-1_AnQnT11Qd",

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "gdjne9f3v2hmocg511onno830"
  }
};


Amplify.configure(awsmobile);
