let mongoose = require('mongoose');
// var database = mongoose.connect('mongodb://localhost:27017/DB');

const { database, secret } = require('../config');
mongoose.Promise = global.Promise;
// mongoose.connect(database);
// mongoose.connect('mongodb://127.0.0.1:27017/mydb');
// console.log("connected to mongodb");

mongoose.connect('mongodb://127.0.0.1:27017/mydb') // if error it will throw async error
    .then(() => { // if all is ok we will be here
      console.log("connected to mongodb");

    })
    .catch(err => { // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

module.exports = mongoose;
