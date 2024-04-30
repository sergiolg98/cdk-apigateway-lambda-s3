const AWS = require("aws-sdk");

exports.handler = async (
  event,
  context
) => {
  // const { bucketName, objKey } = event; // Pass the bucket name and key to retrieve the desired object in S3
  const params = { Bucket: 'balancestatus-0123', Key: 'balance.json' };

  const s3 = new AWS.S3();
  const response = await s3.getObject(params).promise();
  const body = response.Body?.toString('utf-8') || '';

  return {
    'statusCode': 200,
    'body': body,
  };
};
