var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models'),
  query = require('./app/dbhelpers').query,
  app = express();

require('./config/express')(app, config);

// db.sequelize.sync()
//   .then(function() {
//         app.listen(config.port, config.ip);
        var server = app.listen(config.port, config.ip);
        server.timeout = 600 * 60 * 1000;
        //app.listen(8080, config.ip);
        console.log("Started app at : " + config.ip + ":" + config.port)
//   });
