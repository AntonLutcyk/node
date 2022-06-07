module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/hebron_rocket',

  ACCESS_SECRET_TOKEN: 'TOKEN-SECRET',
  REFRESH_SECRET_TOKEN: 'REFRESH-SECRET',
  ACTION_SECRET_TOKEN: 'ACTION_SECRET_TOKEN',

  SYSTEM_MAIL: process.env.SYSTEM_MAIL || '',
  SYSTEM_MAIL_PASSWORD: process.env.SYSTEM_MAIL_PASSWORD || '',

  SITE_URL:'http://localhost:5000',

  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY
}
