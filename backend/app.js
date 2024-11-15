// server.js
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
  }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

module.exports = app;
