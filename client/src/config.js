/*
* AWS file configuration
* To reference all the AWS ressource we have created
*/
export default {
  s3: {
    REGION: "eu-west-3",
    BUCKET: "geo-data-json"
  },
  apiGateway: {
    REGION: "eu-west-3",
    URL: "https://awtpiluamk.execute-api.eu-west-3.amazonaws.com/dev/airwaretest"
  }
};