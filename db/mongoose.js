const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = () => {
    mongoose.connect(
        "mongodb+srv://raktimbanerjee9:QzaKaTq2i0rpswoO@cluster-1.m88as.mongodb.net/test-db?retryWrites=true&w=majority&appName=cluster-1",
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        err => {
            if (err) {
                console.error(err, 'error is here');
                return;
            }

            if (process.env.NODE_ENV !== 'test') {
                console.info('[LOG=DB] Successfully connected to MongoDB');
            }
        }
    );
    return true
};

connect();

module.exports = { mongoose, connect };
