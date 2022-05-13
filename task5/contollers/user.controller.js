const User = require('../db/User.model');
const { authService } = require('../services');
const { statusEnum } = require('../constants');

module.exports = {

  getAllUsers: async (req, res, next) => {

    try {

      const { limit, page } = req.query

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

      const hashPassword = await authService.hashPassword(req.body.password);

      const createdUser = await User.create({...req.body, password: hashPassword});

      res.status(statusEnum.created).json(createdUser);
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
      const { name, age, email, password } = req.body;

      const user = await User.findOneAndUpdate(userId, {
        name,
        age,
        email,
        password,
      });

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
