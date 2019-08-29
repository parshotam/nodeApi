//
// var fs = require('fs'),
//   path = require('path'),
//   Sequelize = require('sequelize'),
//   config = require('../../config/config'),
//   db = {};
// console.log("config.db = ",config.development)
// var sequelize = new Sequelize(config.development);
// //     {
// //   storage: config.storage,
// //   logging: config.sequelize.logger
// // }
//
//
// // const models = {
// //   User: sequelize.import('./user'),
// //   Message: sequelize.import('./message'),
// // };
//
// fs.readdirSync(__dirname).filter(function(file) {
//   console.log("file = ",file)
//     console.log(__dirname)
//
//     console.log((file.indexOf('.') !== 0) && (file !== 'index.js'))
//   return (file.indexOf('.') == 0) && (file !== 'index.js');
// }).forEach(function(file) {
//   console.log(file)
//   var model = sequelize['import'](path.join(__dirname, file));
//   console.log("model.name = ,",model.name)
//   db[model.name] = model;
// });
//
// Object.keys(db).forEach(function(modelName) {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });
//
// // db.sequelize = sequelize.sync();
// console.log("kkkkkkkk")
// const eraseDatabaseOnSync = true;
// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//
//     console.log('ssss')
//
// });
// module.exports = db;
//
//
//
//
