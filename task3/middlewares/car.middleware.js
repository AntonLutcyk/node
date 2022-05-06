const Car = require('../db/Car.model');

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

const checkIsCarNumbDuplicate = async (req, res, next) => {
    try {
        const { carNumb = '' } = req.body;

        const car = await Car.findOne( { carNumb: carNumb.trim() });

        if (car) {
            res
                .status(409)
                .json({
                    message: `Car with number: ${carNumb} already exist`
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
    checkAge,
    checkIsCarNumbDuplicate
};
