const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const multer = require('multer');
const indexRoute = require('./routes/index');
const uploadRoute = require('./routes/upload');



mongoose.connect('mongodb+srv://test:test@cluster0.pmnd5t2.mongodb.net/picShare?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));


app.use(bodyParser.urlencoded({ extended: true }));
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));// pass the form data


app.set('view engine','ejs');// view template

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/upload', uploadRoute);


 const PORT = 4001;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})





















// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://test:test@cluster0.pmnd5t2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// const db = mongoose.connection;
// db.on('error',console.error.bind(console, 'MongoDB connection error'));

// // Middleware for parsing form data
// app.use(express.urlencoded({ extended: true }));

// // Set up EJS for templating
// app.set('view engine', 'ejs');

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/', require('./routes/index'));
// app.use('/upload', require('./routes/upload'));



