const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});
// Define the Photo model
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema); // Assuming Photo model is defined in the same application


const storage = multer.diskStorage({                      // Set up Multer for file uploads
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


router.get('/', (req, res) => {                            // Display the upload form
    res.render('upload',{errors:[]});
});

// Handle photo uploads
router.post('/', upload.single('photo'), [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('upload', { errors: errors.array() });
    }

    const newPhoto = new Photo({
        title: req.body.title,
        description: req.body.description,
        imageUrl: '/images/' + req.file.filename
    });
    try {
        await newPhoto.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error uploading photo');
    }
});

module.exports = router;
