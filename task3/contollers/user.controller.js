const User = require("../db/User.model");

module.exports = {

    getAllUsers: async (req, res) => {

        try {
            const users = await User.find();

            res.json(users);

        } catch (e) {
            res
                .status(400)
                .json({
                    message: e.message
                })
        }

    },

    createUser: async (req, res) => {
        
        try {
            const createUser = await User.create(req.body);

            res.status(201).json(createUser);
        } catch (e) {
            res
                .status(400)
                .json({
                    message: e.message
                })
        }
    },

    deleteUser: async (req, res) => {

        try {
            const {userId} = req.params;
            const user = await User.findByIdAndDelete(userId);

            if (!user) {
                res.status(404).json(`User with id ${userId} not found`)
                return;
            }

            res.send(user);

        } catch (e) {
            res
                .status(400)
                .json({
                    message: e.message
                })
        }

    },

    updateUser: async (req, res) => {
        try {
            const { name } = req.body;

            const car = await User.findOneAndUpdate({name: name.trim()});

            res.json(car);

        } catch (e) {
            res
                .status(400)
                .json({
                    message: e.message
                })
        }

    },

    getUserById: async (req, res) => {

        try {
            const {userId} = req.params;
            const user = await User.findById(userId);

            if (!user) {
                res.status(404).json(`User with id ${userId} not found`)
                return;
            }

            res.json(user);

        } catch (e) {
            res
                .json({
                    message: e.message
                })
        }
    },



}
