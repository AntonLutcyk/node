const express = require('express');
const {engine} = require('express-handlebars');

const app = express();

const carsRouter = require('./routes/cars.router');
const userRouter = require('./routes/user.router');
const reportRouter = require('./routes/report.router')

const {PORT} = require('./config/config');

app.engine('hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.json())
app.use('/cars', carsRouter);
app.use('/users', userRouter);
app.use('/reports', reportRouter);

app.get('/', (req, res) => {
    res.json('Hello')
});

// app.get('/startPage', (req, res) => {
//      res.json(dbUsers);
// });

app.listen(PORT, () => {
    console.log(`Start app ${PORT}`);
});