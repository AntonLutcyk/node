const { Router } = require('express');

const carController = require('../contollers/car.controller');

const {getAllCars, getCarById, createCar} = require("../contollers/car.controller");

const carRouter = Router();

module.exports = carRouter;

carRouter.get('/', carController.getAllCars);

carRouter.get('/:userId', carController.getCarById);

carRouter.post('/', carController.createCar);