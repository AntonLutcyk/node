const Joi = require('joi');

const updateCarJoiSchema = Joi.object( {
  name: Joi.string().alphanum().min(2).max(50).trim(),
  age: Joi.number().integer().min(0),
  engCapacity: Joi.number().min(0.0).max(50.0).default(1.5),
  carNumb: Joi.string().required().trim(),

})

module.exports = {
  updateCarJoiSchema
}
