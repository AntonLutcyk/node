const {Schema, model} = require('mongoose');

const Car = new Schema({
        name: {type: String, trim: true, required: true},
        age: {type: Number, default: 1},
        engCapacity: {type: Number, default: 1.5},
        carNumb: {type: String, unique: true, required: true, trim: true}
    },
    {timestamps: true}
);

module.exports = model('Car', Car);