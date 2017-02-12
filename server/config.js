var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/express_app_db';
mongoose.connect(mongoDB);

var testMongoDB = 'mongodb://127.0.0.1/express_app_db_test';
mongoose.connect(testMongoDB);

var db = mongoose.connection;
var testDB = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
testDB.on('error', console.error.bind(console, 'MongoDB_test connection error:'));



module.exports = {
  db,
  testDB
};
