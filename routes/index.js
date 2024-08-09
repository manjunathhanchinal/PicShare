const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});
// Define the Photo model
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema); // Assuming Photo model is defined in the same application

// Display all photos
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.render('index', { photos });
    } catch (err) {
        console.error('Error fetching photos:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
