const dbCars = require("../db/cars");

module.exports = {
    getAllCars: (req, res) => {
        res.render('cars', {dbCars})
    },

    getCarById:  (req, res) => {
        console.log(req.body);

        dbCars.push(req.body);

        res.json(dbCars);
    },

    createCar: (req, res) => {
        const {carId} = req.params;
        const cars = dbCars[carId];

        if (!cars) {
            res.status(404).json(`User with id ${carId} not found`)
            return;
        }

        res.json(cars);
    }
}