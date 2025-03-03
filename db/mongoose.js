const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = () => {
    mongoose.connect(
        "mongodb+srv://raktim:c0F1XUWhVu24vuFu@cluster0.m88as.mongodb.net/shop-from-bharat?retryWrites=true&w=majority&appName=Cluster0",
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
