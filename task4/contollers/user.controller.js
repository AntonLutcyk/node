const User = require('../db/User.model');
const ApiError = require('../error/ApiError');

module.exports = {

  getAllUsers: async (req, res, next) => {

    try {

      const { limit, page } = req.query

      if(limit < 0 && page < 0) {
        next(new ApiError('Incorrect value', 400));
      }

      const skip = (page - 1) * limit;

      const users = await User.find().limit(limit).skip(skip);

      const countAllUsers = await User.count({});

      res.json({
        page,
        perPage: limit,
        countAllUsers,
        data: users
      });

    } catch (e) {
      next(e);
    }

  },

  createUser: async (req, res, next) => {
        
    try {
      const createUser = await User.create(req.body);

      res.status(201).json(createUser);

    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {

    try {

      const {userId} = req.params;
      const delUser = await User.findByIdAndDelete(userId);

      res.json(delUser);

    } catch (e) {
      next(e);
    }

  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.body;

      const user = await User.findOneAndUpdate({userId: userId.trim()});

      res.json(user);

    } catch (e) {
      next(e);
    }

  },

  getUserById: async (req, res, next) => {

    try {

      const {userId} = req.params;
      const user = await User.findById(userId);

      res.json(user);

    } catch (e) {
      next(e);
    }
  },
}
