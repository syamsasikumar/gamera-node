var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var FeedSchema = new Schema({
  guid : String,
  type : String,
  source : String,
  title : String,
  description : String,
  thumbnail : String, 
  link : String,
  date : Number
});

module.exports = mongoose.model('feeds', FeedSchema);