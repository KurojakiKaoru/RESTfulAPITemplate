const express = require('express');
const app = express();
const { connect } = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port = process.env.PORT || 8000;

// Express Static Files
let fileRequestOptions = {
	dotfiles: "ignore", // allow, deny, ignore
	etag: true,
	extensions: ["ico", "png", "jpg"],
	index: false, // to disable directory indexing
	maxAge: "7d",
	redirect: false,
	setHeaders: function(res, path, stat) {
	  	//add this header to all static responses
	  	res.set("x-timestamp", Date.now());
	}
};

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public', fileRequestOptions));

// Import Routes
const exampleRoute = require('./routes/posts');
app.use('/posts', exampleRoute);

// Main Routes
app.get('/', (req, res) => {
    res.json({ message: 'Your API is working!' });
});

// Invalid request handler
app.use((req, res) => {
	res.status(404).json({
		message: `This endpoint doesn't exist.`
	});
});

// JSON Web Token Authentication - TODO
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({ message: "Unauthorized access" });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token" }) && console.log(err);
        req.user = user;
        next();
    });
}

// Connect to Database
connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to the Database!');
});

// App Listener
app.listen(port, () => {
    console.log(`This API is live on port ${port}.`);
});