var express = require('express'),
    router = express.Router(),
    nodeMailer = require('nodemailer');
    // sgMail = require('@sendgrid/mail');


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

    // var transporter = nodemailer.createTransport('smtps://princesehgal452%40gmail.com:PSEHGAL45@smtp.gmail.com');
    // // setup e-mail data with unicode symbols
    // var mailOptions = {
    //     from: '"Prince" <princesehgal452@gmail.com>', // sender address
    //     to: 'parshotam.kumar32@gmail.com', // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world ?', // plaintext body
    //     html: '<b>Hello world ?</b>' // html body
    // };
    //
    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log('Message sent: ' + info.response);
    // });



    let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              // should be replaced with real sender's account
              user: 'amansehgal870@gmail.com',
              pass: 'aman03765'
          }
      });
      let mailOptions = {
          // should be replaced with real recipient's account
          to: 'parshotam.kumar32@gmail.com',
          subject: "Set card detail",
          body: 'tesyee'
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });



//     var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'princesehgal452@gmail.com',
//     pass: 'PSEHGAL45'
//   }
// });
//     let data = '<strong>Please <a href="[url]"> click here</a>  to enter all details </strong>'
//     data = data.replace('[url]', url)
//     // send mail with defined transport object
//     let info =  transporter.sendMail({
//         from: 'princesehgal452@gmail.com', // sender address
//         to: email, // list of receivers
//         subject: 'Set card details', // Subject line
//         text: 'Hello world?', // plain text body
//         html: 'tesyee ',
//
//     });
//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



router.post('/savedata', function(req, res) {

	    console.log('----useri-------',req.body.source)
        var source = req.body.source;
        var destination = req.body.destination
        var email = req.body.email
        var price = req.body.price
        var currency = req.body.currency
        var url= req.body.url
        // sendEmail(email,url)

        pool.query('INSERT INTO user_data (source, destination, email, price, currency) VALUES ($1, $2, $3, $4, $5) RETURNING id', [source, destination, email, price, currency], (error, results) => {
            if (error) {
              res.json({
                   'status':'error',
                   'msg': 'Some error occur.'
                });
            }



            res.json({
                   'status':'success',
                   'msg': 'Data saved successfully.',
                    'results':results.rows[0].id
                })
          });

});

router.get('/getdata', function(req, res) {

        pool.query('SELECT * from user_data', function(error, results){
            if (error) {
              res.json({
                   'status':'error',
                   'msg': 'Some error occur.'
                });
            }



            res.json({
                   'status':'success',
                   'msg': 'Get Data saved successfully.',
                    'data':results.rows
                })
          });

});



router.post('/savecarddata', function(req, res) {
        // var card_data = req.body.card_data;
        var card_number = req.body.card_number
        var expiry_date = req.body.expiry_date
        var user_id = req.body.user_id
        var cvv = req.body.cvv
        pool.query('INSERT INTO card_data (card_number, expiry_date, user_id, cvv) VALUES ($1, $2, $3, $4, $5)', [card_number, expiry_date, user_id, cvv], (error, results) => {
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





