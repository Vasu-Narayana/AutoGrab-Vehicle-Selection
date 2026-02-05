const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { submitVehicle } = require('../controllers/vehicle.controller');

router.post('/submit', upload.single('logbook'), submitVehicle);

module.exports = router;