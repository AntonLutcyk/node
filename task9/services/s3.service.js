const S3_AWS = require('aws-sdk/clients/s3');
const path = require('path');
const { v4 } = require('uuid');


const { S3_SECRET_KEY, S3_BUCKET, S3_ACCESS_KEY, S3_REGION } = require('../config/config');

const s3 = new S3_AWS({
  accessKeyId: S3_ACCESS_KEY, 
  secretAccessKey: S3_SECRET_KEY, 
  signatureVersion: 'v4',
  region: S3_REGION
});

const uploadFile = async (fileToUpload, itemType, itemId) => {

  const Key = _createFilePath(itemType, itemId, fileToUpload.name);

  await s3.upload({
    ACL: "public-read",
    Bucket: S3_BUCKET,
    Body: fileToUpload.data,
    Key
  }).promise();

  const signedUrl = s3.getSignedUrl('getObject', {Bucket: S3_BUCKET, Key});

  return signedUrl;
};

// const getFile = async () => {
//   await s3.getObject( {
//     Bucket: S3_BUCKET,
//     Key:
//   })
// }

function _createFilePath(itemType, itemId, fileName) {

  const ext = path.extname(fileName);

  return path.normalize(`${itemType}/${itemId}/${v4()}.${ext}`);

}

module.exports = {
  uploadFile
}
