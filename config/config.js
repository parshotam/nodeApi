var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  port = process.env.PORT || 8000,
  ip = process.env.IP || '0.0.0.0',
  test = require('assert'),
  Sequelize = require('sequelize'),
  url = 'mongodb://localhost:27017',
  urlDB = 'mongodb://localhost:27017/lotteryapp',
  dbName = 'lotteryapp',
  MongoClient = require('mongodb').MongoClient,
  testDb;
//Import the mongoose module
// var mongoose = require('mongoose');
// var mongoDB = 'mongodb://localhost:27017/lotteryapp';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var sequelize = new Sequelize('postgres://postgres:pass123@localhost:5432/test_data');
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  console.log("SSSSSS SSSS")
});

config = {
  "development": {
    "username": "postgres",
    "password": "pass123",
    "database": "test_data",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  root: rootPath,
  app: {
    name: 'CloudBinc'
  } ,

  port: port,
  ip: ip,
// Connection url

  // mngDB: db,

// Connect using MongoClient
  db :'postgres://postgres:pass123@localhost:5432/test_data',
  fromEmail:'noreply.cloudbinc@gmail.com',
  password:'pass@root',
  fromEmailReq:'Cloudbinc <noreply.cloudbinc@gmail.com>',
  sequelize: {
    logger: false
  },
  jwtSecret: 'xjkds5jfiew23905as7/3uk',
}


module.exports = config;
