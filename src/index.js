// Imports
require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');


const app = express(); // Represents entire application

// Mongo Details

// username : harshashenoy63
// password : DrdU6cTuLqMJIn6A
// mongodb+srv://harshashenoy63:DrdU6cTuLqMJIn6A@json-server.oaoktm2.mongodb.net/

const mongoUri = 'mongodb+srv://harshashenoy63:DrdU6cTuLqMJIn6A@json-server.oaoktm2.mongodb.net/';
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {console.log("Connected to mongo...")});
mongoose.connection.on('error', (error) => {console.log("Error connecting to mongo... ", error)});

// Mongo Details end

// Routes
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes)

app.get('/' , requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`);
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
})