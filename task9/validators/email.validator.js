const Joi = require('joi');

const emailSchema = Joi.object( {
  email: Joi.string().required().trim().lowercase(),
})

module.exports = {
  emailSchema
}
