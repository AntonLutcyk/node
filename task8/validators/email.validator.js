const Joi = require('joi');

const constants = require('../constants/constants');

const emailSchema = Joi.object( {
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
})

module.exports = {
  emailSchema
}
