const Joi = require('joi');

const constants = require('../constants/constants');

const updateUserJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).trim(),
  age: Joi.number().min(9),
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
});

module.exports = {
  updateUserJoiSchema
};
