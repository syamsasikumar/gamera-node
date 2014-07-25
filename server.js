var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 8082;
var count = 20;
var page = 1;

mongoose.connect('mongodb://kyojin:kyojin123@ds053469.mongolab.com:53469/kyojin'); //@hideme

var feed = require('./models/feed');

var app = express();
app.use(bodyParser());

var setHeaders = function(req, res){
    res.set({
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT, DELETE',
    'Access-Control-Max-Age': '1728000'
  });
}

app.get('/feeds',function(req,res,next){
  setHeaders(req, res);
  hideNews = req.param('hide_news')? req.param('hide_news') : 0 ;
  hideTweet = req.param('hide_tweet') ? req.param('hide_tweet') : 0;
  hideLive = req.param('hide_live')? req.param('hide_live') : 0;
  page = req.param('page') ? req.param('page') : page;
  lastTs = req.param('last_ts') ? req.param('last_ts') : 0;
  count = req.param('count') ? req.param('count') : count;
  search = req.param('search') ? req.param('search') : false;

  conditions = [];
  conditions.push({title: {'$ne' : null}});
  if(hideNews == 1){
    conditions.push({type: {'$ne' : 'news'}});
  }
  if(hideTweet == 1){
    conditions.push({type: {'$ne' : 'tweet'}});
  }
  if(hideLive == 1){
    conditions.push({type: {'$ne' : 'live'}});
  }
  if(lastTs > 0){
    conditions.push({date: {'$gt' : lastTs}});
  }
  if(search){
    conditions.push({
      '$or' : [
        { 'title' : new RegExp(search, 'i')},
        {'description' : new RegExp(search, 'i')}
      ]}
    );
  }
  
  feed
  .find({
    $and : conditions
  })
  .sort({date : -1})
  .limit(count)
  .skip((page - 1) * count)
  .exec(function(err, feeds){
    res.json(feeds)
  })
});

app.listen(port);