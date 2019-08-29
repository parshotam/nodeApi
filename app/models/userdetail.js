var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../config/config').jwtSecret;
const AutoIncrement = require('mongoose-sequence')(mongoose);


var User = new mongoose.Schema({
  id: Number,
  source: String,
  destination: String,
  currency:String,
  email: String,
  price: String,

});


User.plugin(AutoIncrement, {inc_field: 'id'});


module.exports = mongoose.model('userdetail', User);

