const Car = require("../db/Car.model");

module.exports = {

    getAllCars: async (req, res) => {
        try {
            const cars = await Car.find();

            res.json(cars);
        } catch (e) {
            res
                .status(400)
                .json({
                    message: e.message
                })
        }
    },

    getCarById: async (req, res) => {

        try {
            const { carId } = req.params;
            const car = await Car.findById(carId);

            if (!car) {
                res.status(404).json(`Car with id ${carId} not found`)
                return;
            }

            res.json(car);

        } catch (e) {
            res
                .json({
                    message: e.message
                })
        }

    },

    createCar: async (req, res) => {

        try {
            const createCar = await Car.create(req.body);

            res.status(201).json(createCar);
        } catch (e) {
            res
                .status(400)
                .json({
                    message: e.message
                })
        }
    },


    deleteCar: async (req, res) => {

        try {
            const {carId} = req.params;
            const car = await Car.findByIdAndDelete(carId);

            if (!car) {
                res.status(404).json(`Car with id ${carId} not found`)
                return;
            }

            res.send(car);

        } catch (e) {
            res
                .status(400)
                .json({
                    message: e.message
                })
        }

    }
}
