const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError');
const { statusEnum, userErrorsEnum } = require('../constants');

async function comparePassword(hashingPassword, password) {
  const isPasswordSame = await bcrypt.compare(password, hashingPassword);
    
  if (!isPasswordSame) {
    throw new ApiError(userErrorsEnum.incorrectPass, statusEnum.badRequest);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

module.exports = {
  comparePassword,
  hashPassword
}
