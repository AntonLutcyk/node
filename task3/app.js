const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

const carsRouter = require('./routes/cars.router');
const userRouter = require('./routes/user.router');
const reportRouter = require('./routes/report.router');

const {PORT, MONGODB} = require('./config/config');

app.engine('hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs')
app.set('views', './views')

mongoose.connect(MONGO_DB).then(value =>  {
    console.log('Connection success');
})

app.use(express.json());
app.use('/cars', carsRouter);
app.use('/users', userRouter);
app.use('/reports', reportRouter);

// app.get('/', (req, res) => {
//     res.json('Hello')
// });

app.listen(PORT, () => {
    console.log(`Start app ${PORT}`);
});
