const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError');

async function comparePassword(hashingPassword, password) {
  const isPasswordSame = await bcrypt.compare(password, hashingPassword);
    
  if (!isPasswordSame) {
    throw new ApiError('Incorrect password or email', 400);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

module.exports = {
  comparePassword,
  hashPassword
}
