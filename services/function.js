const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = (event) => {
  const { bucketName, objKey } = event; // Pass the bucket name and key to retrieve the desired object in S3
  const params = {
    Bucket: bucketName,
    Key: objKey
  };
  return new Promise((resolve) => {
    s3.getObject(params, async (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        const contents = JSON.parse(data.Body)
        resolve(contents);
      }
    });
  })
};