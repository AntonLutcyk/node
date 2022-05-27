const { queryValidator } = require('../validators');
const ApiError = require('../error/apiError');
const { statusEnum } = require("../constants");

const queryVal = (req, res, next) => {
  try {
    const {error} = queryValidator.queryJoiSchema.validate(req.query);

    if (error) {
      next(new ApiError(error.details[0].message, statusEnum.badRequest));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  queryVal
}
