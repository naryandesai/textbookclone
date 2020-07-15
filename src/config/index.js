import Amplify from 'aws-amplify';

export default {
  region: "us-east-1",

  IdentityPoolId: "us-east-1_eqPRQ1SLt",
  UserPoolId: "us-east-1:083124225867",
  ClientId: "4hj4872ba7c14i22oe9k5304mv"
};

const awsmobile = {
  Auth: {
    // Amazon Cognito Region
    region: "us-east-1",

    // Amazon Cognito User Pool ID
    userPoolId: "us-east-1_eqPRQ1SLt",

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "4hj4872ba7c14i22oe9k5304mv"
  }
};


Amplify.configure(awsmobile);
