const Joi = require('joi');

const constants = require('../constants/constants');

const newUserJoiSchema = Joi.object( {
  name: Joi.string().alphanum().min(2).max(40).trim(),
  age: Joi.number().integer().min(9),
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
  gender: Joi.string().valid('male', 'female'),
  auto: Joi.boolean(),
  driveLicence: Joi.boolean()
      .when('auto', {is: true, then: Joi.required() })
})

module.exports = {
  newUserJoiSchema
}
