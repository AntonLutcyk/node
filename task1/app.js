const express = require('express');
const {engine} = require('express-handlebars');
const app = express();

const dbCars = require('./db/cars');
const dbUsers = require('./db/users');

app.engine('hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.json('Hello')
});

app.get('/cars', (req, res) => {
    res
        .status(404)
        .render('cars', {dbCars})
});


app.get('/cars/:carId', (req, res) => {
    console.log(res);
    const {carId} = req.params;
    res.json(dbCars[carId]);
});


app.get('/startPage', (req, res) => {
     res.render('startPage');
});

app.get('/users', (req, res) => {
    res
        .status(404)
        .render('users', {dbUsers})
});

app.get('/users/:userId', (req, res) => {
    console.log(res);
    const {userId} = req.params;

    res.json(dbUsers[userId]);
});

app.listen(5000, () => {
    console.log('Start app')
});