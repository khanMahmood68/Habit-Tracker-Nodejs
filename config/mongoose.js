const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/habit-tracker');

const db_URI = 'mongodb+srv://mahmood68:F9J00qC5FYWQENgn@cluster0.r4xwbxw.mongodb.net/';

mongoose.connect(db_URI)

const db = mongoose.connection;

//if error then pritnt message
db.on('error', console.error.bind(console, 'error in connectin DB'));

// server is up then run a message 
db.once('open', () => {
    console.log('Yup connected successfully with MongoDb');
})
module.export = db;
