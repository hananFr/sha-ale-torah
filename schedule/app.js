const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const times = require('./routes/times');

require('dotenv').config();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://shaaley-torah-reports.netlify.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})


app.use('/auth', auth);
app.use('/times', times);



const mongoPassword = process.env.MONGO_PASSWORD;

mongoose.connect(`mongodb+srv://hananfruman:${mongoPassword}@server-side.2g18t.mongodb.net/shaaletorah?retryWrites=true&w=majority`)
  .then(result => {
    console.log('Mongoose is connected!!!');
    app.listen(8080);
  })
  .catch(err => {
    err.statusCode = 500;
    err.message = 'Could not connect to database!'
  });


app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  })
});
