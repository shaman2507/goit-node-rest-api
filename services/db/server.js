const mongoose = require('mongoose');

const DB_HOST = 'mongodb+srv://Joki22:ZxcV1234@cluster0.qbbj9ab.mongodb.net';

mongoose.connect(DB_HOST)
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });

    
module.exports = DB_HOST