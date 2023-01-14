const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const s3 = require('./config/s3');
const dotenv = require('dotenv');

dotenv.config();

// import image and user routes

// import middleware 

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
