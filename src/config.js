const config = {
    STRIPE_KEY: "pk_test_51QbmRg4RryP6nzVy5q1aizzFCWs8wR9SFY1WUAd11lkosvnUWvyeF18x8z2qh1HsaR1ljGO7p14D1hfHGRcqkpxf00WDbEmSms",
    s3: {
        REGION: "us-east-1",                  // Replace with your region
        BUCKET: "notes-app-uploads-5-7",      // Replace with your bucket name
    },
    apiGateway: {
        REGION: "us-east-1",                  // Replace with your region
        URL: "https://idckr0pvu4.execute-api.us-east-1.amazonaws.com/prod/", // Replace with your API Gateway URL
    },
    cognito: {
        REGION: "us-east-1",                  // Replace with your region
        USER_POOL_ID: "us-east-1_oiRSFdLLG",  // Replace with your Cognito User Pool ID
        APP_CLIENT_ID: "1tbn8bvvr0qns103up6tjn1av8", // Replace with your Cognito App Client ID
        IDENTITY_POOL_ID: "us-east-1:45a5b00c-7744-440a-8f3b-f07d3aa1a0a7", // Replace with your Cognito Identity Pool ID
    },
    MAX_ATTACHMENT_SIZE: 5000000  // Max file size for attachments (5 MB)
};

export default config;
