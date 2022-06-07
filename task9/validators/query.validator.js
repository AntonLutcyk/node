const Joi = require('joi');

const queryJoiSchema = Joi.object({
  limit: Joi.number().min(1).max(30),
  page: Joi.number().min(1)
})

module.exports = {
  queryJoiSchema
};
