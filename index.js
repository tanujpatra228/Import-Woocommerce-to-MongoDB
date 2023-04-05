const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// Connect to DB
mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log("can't connect to DB:", err.message));


// Import Rputes
const importRoute = require('./routes/import');

// Routes
app.use('/migrate', importRoute);

// Start server
app.listen(3032, () => console.log('Server Started: http://localhost:3032'));
