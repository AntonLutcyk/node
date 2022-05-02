const { Router } = require('express');

const carController = require('../contollers/car.controller');

const {getAllCars, getCarById, createCar} = require("../contollers/car.controller");
const userController = require("../contollers/user.controller");

const carRouter = Router();

module.exports = carRouter;

carRouter.get('/', carController.getAllCars);

carRouter.get('/:carId', carController.getCarById);

carRouter.post('/', carController.createCar);

carRouter.delete('/:carId', carController.deleteCar);