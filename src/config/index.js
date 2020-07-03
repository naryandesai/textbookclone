import Amplify from 'aws-amplify';

export default {
  region: "us-east-1",

  IdentityPoolId: "us-east-1_5FlhvLFRe",
  UserPoolId: "us-east-1:083124225867",
  ClientId: "47ot4pmq5uv2aabdvbsg3mg1v9"
};

const awsmobile = {
  Auth: {
    // Amazon Cognito Region
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: "us-east-1_5FlhvLFRe",

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "47ot4pmq5uv2aabdvbsg3mg1v9"
  }
};


Amplify.configure(awsmobile);
