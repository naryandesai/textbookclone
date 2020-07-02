import Amplify from 'aws-amplify';

export default {
  region: "us-east-1",

  IdentityPoolId: "us-east-1_jdETcc6Zw",
  UserPoolId: "us-east-1:690430404508",
  ClientId: "673k7kbuq3pnmomu14lk4e78ns"
};

const awsmobile = {
  Auth: {
    // Amazon Cognito Region
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: "us-east-1_jdETcc6Zw",

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "673k7kbuq3pnmomu14lk4e78ns"
  }
};


Amplify.configure(awsmobile);
