const Joi = require('joi');
const constants = require('../constants/constants');

const passSchema = Joi.object( {
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
})

module.exports = {
  passSchema
}
