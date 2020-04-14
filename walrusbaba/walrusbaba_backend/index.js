const express = require('express');

const mongoose = require('mongoose');

const router = require('./src/Router/index');

const config = require('./src/config');

const app = express();

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }, error => {
  if (!error) {
    console.log('Successfully Connected!!!');
  } else {
    console.error('error connection to database');
  }
});

app.use('/', router);

app.listen(config.PORT, console.log(`http://localhost:${config.PORT}`));
