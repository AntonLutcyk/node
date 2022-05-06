const User = require('../db/User.model');

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const { email = '' } = req.body;

        const isUserPresent = await User.findOne( { email: email.toLowerCase().trim() });

        if (isUserPresent) {

            res
                .status(409)
                .json({
                    message: `User with email: ${email} already exist`
                })
            return;
        }

        next()

    } catch (e) {
        res
            .status(400)
            .json({
                message: e.message
            })
    }
}

const checkAge = async (req, res, next) => {
    try {
        const {age = ''} = req.body;

        if (age < 0)
        {
            res
                .status(409)
                .json({
                    message: 'Incorrect age'
                })
            return;
        }

        next()

    } catch (e) {

        res
            .status(400)
            .json({
                message: e.message
            })
    }
}


module.exports = {
    checkIsEmailDuplicate,
    checkAge
};