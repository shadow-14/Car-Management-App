// models/Car.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const carSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    tags: [String],
    images: [String],
}, { timestamps: true });

carSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    next();
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
