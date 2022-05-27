const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { ACCESS_SECRET_TOKEN, REFRESH_SECRET_TOKEN, ACTION_SECRET_TOKEN } = require('../config/config');
const { statusEnum, userErrorsEnum, actionTypesENUM} = require('../constants');
const { tokenTypeEnum } = require('../constants');
const { authErrorEnum } = require('../constants')

async function comparePassword(hashingPassword, password) {
  const isPasswordSame = await bcrypt.compare(password, hashingPassword);
    
  if (!isPasswordSame) {
    throw new ApiError(userErrorsEnum.incorrectPass, statusEnum.badRequest);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

function generateTokenPair(encodeData = {}) {
  const access_token = jwt.sign(encodeData, ACCESS_SECRET_TOKEN, {expiresIn: '15m'});
  const refresh_token = jwt.sign(encodeData, REFRESH_SECRET_TOKEN, {expiresIn: '30d'});

  return {
    access_token,
    refresh_token
  }
}

function validateToken(token, tokenType = tokenTypeEnum.ACCESS) {
  try{
    let secretWord = ACCESS_SECRET_TOKEN;

    if (tokenType !== tokenTypeEnum.REFRESH) {
      secretWord = REFRESH_SECRET_TOKEN
    }

    if (tokenType !== actionTypesENUM.FORGOT_PASSWORD) {
      secretWord = ACTION_SECRET_TOKEN
    }

    return jwt.verify(token, secretWord)
  } catch (e) {
    throw new ApiError(e.message || authErrorEnum.noValidToken, statusEnum.badRequest);
  }

}

function generateActionToken(actionType, encodeData = {}) {
  return jwt.sign(encodeData, ACTION_SECRET_TOKEN, {expiresIn: '24h'});
}

module.exports = {
  comparePassword,
  hashPassword,
  generateTokenPair,
  validateToken,
  generateActionToken
}
