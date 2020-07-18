// Express modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorControllers = require('./controllers/errors').get404;

const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');


// Server variables
const app = express();
app.set('view engine', 'ejs'); // Cambiar si usáis PUG

// MONGODB DATABASE ACCESS
const MONGODB_URI = 'mongodb+srv://root:root@cluster0-zkkee.mongodb.net/bookingClone';

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(customerRoutes);
app.use('/admin', adminRoutes);
app.use(errorControllers);

mongoose
  .connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log('Error al conectar a la base de datos:', err);
  });
