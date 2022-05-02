const dbUsers = require("../db/users");

module.exports = {
    getAllUsers: (req, res) => {
        res.render('users', {dbUsers})
    },

    createUser: (req, res) => {
        console.log(req.body);

        dbUsers.push(req.body);

        res.json(dbUsers);
    },

    deleteUser: (req, res) => {

        const {userId} = req.params;
        const users = dbUsers[userId];

        if (!users) {
            res.status(404).json(`User with id ${userId} not found`)
            return;
        }

        res.send(users);
    },

    getUserById: (req, res) => {
        const {userId} = req.params;
        const users = dbUsers[userId];

        if (!users) {
            res.status(404).json(`User with id ${userId} not found`)
            return;
        }

        res.json(users);
    }
}