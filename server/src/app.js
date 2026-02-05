const express = require('express');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicle.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vehicle', vehicleRoutes);

app.use(errorHandler);

module.exports = app;