const express = require('express');
const {
    createCar, getCars, updateCar, deleteCar,
    getCarById
} = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/upload');
const router = express.Router();

router.route('/')
    .post(protect,upload.array("images",10), createCar)
    .get(protect, getCars);

router.route('/:id')
    .get(protect, getCarById)
    .put(protect, updateCar)
    .delete(protect, deleteCar);

module.exports = router;
