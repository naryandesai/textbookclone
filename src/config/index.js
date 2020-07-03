import Amplify from 'aws-amplify';

export default {
  region: "us-east-1",

  IdentityPoolId: "us-east-1_bLxpeg9Dy",
  UserPoolId: "us-east-1:083124225867",
  ClientId: "7kf72usbiklkest6pq2prqs7q7"
};

const awsmobile = {
  Auth: {
    // Amazon Cognito Region
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: "us-east-1_bLxpeg9Dy",

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "7kf72usbiklkest6pq2prqs7q7"
  }
};


Amplify.configure(awsmobile);
