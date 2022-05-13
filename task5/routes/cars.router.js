const { Router } = require('express');

const carController = require('../contollers/car.controller');

const carMiddlewares = require('../middlewares/car.middleware');

const carRouter = Router();

module.exports = carRouter;


carRouter.get('/', carController.getAllCars);
carRouter.post('/', carMiddlewares.newCarValidator, carMiddlewares.checkIsCarNumbDuplicate, carController.createCar);

carRouter.all('/carId', carMiddlewares.checkIsCarPresent);
carRouter.delete('/:carId', carController.deleteCar);
carRouter.get('/:carId', carController.getCarById);
carRouter.patch('/:carId', carMiddlewares.checkIsCarNumbDuplicate, carController.updateCar);

