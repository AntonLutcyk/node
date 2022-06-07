const express = require('express');
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const {PORT, MONGODB_URL} = require('./config/config');
const {authRouter, reportRouter, carRouter, userRouter} = require('./routes');

const ApiError = require('./error/ApiError');

function _notFoundHandler(req, res, next) {
  next(new ApiError('Not found', 404));
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: err.status
    })
}

app.engine('hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs')
app.set('views', './views')

mongoose.connect(MONGODB_URL).then(value => {
  console.log('Connection success');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('/reports', reportRouter);
app.use(_notFoundHandler);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  console.log(`Start app ${PORT}`);
});
