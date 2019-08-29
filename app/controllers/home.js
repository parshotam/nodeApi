var express = require('express'),
    router = express.Router();
    var sgMail = require('@sendgrid/mail');


// var User = require('../models/user.js');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_data',
  password: 'pass123',
  port: 5432,
})
module.exports = function(app) {

  app.use('/api', router);


};





router.get('/', function(req, res, next) {

    user =  req.session.user || null
    res.render('index', {
        title: 'Dashboard',
        user : user
    });
});



router.post('/savedata', function(req, res) {

	    console.log('----useri-------',req.body.source)
        var source = req.body.source;
        var destination = req.body.destination
        var email = req.body.email
        var price = req.body.price
        var currency = req.body.currency
        var url= req.body.url
        pool.query('INSERT INTO user_data (source, destination, email, price, currency) VALUES ($1, $2, $3, $4, $5)', [source, destination, email, price, currency], (error, results) => {
            if (error) {
              res.json({
                   'status':'error',
                   'msg': 'Some error occur.'
                });
            }

            sgMail.setApiKey('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');

              const msg = {

                  to: req.body.email.toString(),
                  from: "keval688@gmail.com",
                  subject: 'Set Card detail',
                  // text: 'Now send email by sendgriddddd',
                  html: '<strong>Please <a href="'+url+'"> click here</a>  to enter all details </strong>',

              };


              sgMail.send(msg);

            res.json({
                   'status':'success',
                   'msg': 'Data saved successfully.'
                })
          });

});



router.post('/savecarddata', function(req, res) {
        var card_data = req.body.card_data;
        var card_number = req.body.card_number
        var expiry_date = req.body.expiry_date
        var user_id = req.body.user_id
        var cvv = req.body.cvv
        pool.query('INSERT INTO card_data (card_data, card_number, expiry_date, user_id, cvv) VALUES ($1, $2, $3, $4, $5)', [card_data, card_number, expiry_date, user_id, cvv], (error, results) => {
            if (error) {
              res.json({
                   'status':'error',
                   'msg': 'Some error occur.'
                });
            }

            res.json({
                   'status':'success',
                   'msg': 'Data saved successfully.'
                })
          });

});





