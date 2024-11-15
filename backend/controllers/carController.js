const Car = require('../models/Car');
const slugify = require('slugify');

// Create a new car with image upload
const createCar = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, tags } = req.body;
    
    // Handle image file(s) from multer
    let images = [];
    if (req.files) {
      images = req.files.map((file) => `${file.path}`);  // Store file path in the database
    }

    const car = new Car({
      user: req.user._id,
      title,
      description,
      tags: tags.split(','),  // Assuming tags come as a comma-separated string
      images,  // Store image paths in the database
      slug: slugify(title, { lower: true, strict: true }),
    });

    const createdCar = await car.save();
    res.status(201).json(createdCar);  // Send the created car data as a response
  } catch (error) {
    console.error(error);  // For debugging purposes
    res.status(500).json({ message: 'Failed to create car', error });
  }
};



// Get all cars for the logged-in user
const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user._id });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve cars', error });
    }
};

// Get a specific car by ID
const getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user._id });
        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve car', error });
    }
};

// Update a car by ID
const updateCar = async (req, res) => {
    try {
        const { title, description, tags, images } = req.body;
        const car = await Car.findOne({ _id: req.params.id, user: req.user._id });

        if (car) {
            car.title = title;
            car.description = description;
            car.tags = tags;
            car.images = images;
            car.slug = slugify(title, { lower: true, strict: true });

            const updatedCar = await car.save();
            res.json(updatedCar);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car', error });
    }
};

// Delete a car by ID
const deleteCar = async (req, res) => {
    try {
        const carId = req.params.id;  // Get the car ID from the route parameter
        console.log(carId);  // Log the car ID to see what is being passed

        // Find the car by ID and ensure it belongs to the authenticated user
        const car = await Car.findOne({ _id: carId, user: req.user._id });

        if (car) {
            // Use deleteOne method to delete the car
            await Car.deleteOne({ _id: carId });
            res.json({ message: 'Car removed' });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        console.error("Error during deletion:", error);  // Log the error to the server console
        res.status(500).json({ message: 'Failed to delete car', error: error.message });
    }
};



module.exports = { createCar, getCars, getCarById, updateCar, deleteCar };
