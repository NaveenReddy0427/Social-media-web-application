const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

// if any error
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

// if succesfully connected
db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

module.exports = db;