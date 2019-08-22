const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.set('useNewUrlParser', true);

// Import Routes
const postsRoute = require('./routes/posts');
app.use('/examples', postsRoute);

// Routes
app.get('/', (req, res) => {
    res.send('Your API is working!');
});

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to the Database!');
});

// App Listener
app.listen(port, () => {
    console.log('This API is live on port ' + port + '.');
})