var express = require('express'),
    router = express.Router(),
    nodemailer = require('nodemailer');
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


function sendEmail(email, url) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount =  nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport


    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'princesehgal452@gmail.com',
    pass: 'PSEHGAL45'
  }
});

    // send mail with defined transport object
    let info =  transporter.sendMail({
        from: 'princesehgal452@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Set card details', // Subject line
        // text: 'Hello world?', // plain text body
        html: '<strong>Please <a href="'+url+'"> click here</a>  to enter all details </strong>',

    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



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


            sendEmail(email,url);
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





