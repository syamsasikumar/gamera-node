var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 8082;
var count = 20;
var page = 1;

//@todo: move this 
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

// for CORS
app.options('/*',function(req,res){
  setHeaders(req, res);
  res.send('');
});


/**
 * @api {get} /feeds Request soccer feeds
 * @apiName GetFeeds
 * @apiGroup Feed
 *
 * @apiParam {Boolean} [hide_news=0] Hides news feeds from output.
 * @apiParam {Boolean} [hide_tweet=0] Hides tweets from output.
 * @apiParam {Boolean} [hide_live=0] Hides live feed from output.
 * @apiParam {Number} [page=1] Page Number.
 * @apiParam {Number} [count=20] Count of rows expected per page.
 * @apiParam {Number} [after_ts] Upper limit for timestamp.
 * @apiParam {Number} [last_ts] Lower limit from timestamp.
 * @apiParam {String} [search] Keyword to search in title / description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *        "_id":"53d164d668425b29ecc809c8",
 *        "title":"#Soccer #Livescore @ScoresPro: (UEFA-2QR) FC Groningen vs Aberdeen: 1-2 ",
 *        "link":"http://www.scorespro.com/soccer/livescore/fc-groningen-vs-aberdeen/24-07-2014/",
 *        "guid":"9f9d9071d9e0072b831f02d577b51ac5",
 *        "description":"Match Finished",
 *        "thumbnail":"",
 *        "date":1406229555,
 *        "type":"live",
 *        "source":"live-soccer"
 *      }]
 *
 */

app.get('/feeds',function(req,res,next){
  setHeaders(req, res);
  hideNews = req.param('hide_news')? req.param('hide_news') : 0 ;
  hideTweet = req.param('hide_tweet') ? req.param('hide_tweet') : 0;
  hideLive = req.param('hide_live')? req.param('hide_live') : 0;
  page = req.param('page') ? req.param('page') : page;
  lastTs = req.param('last_ts') ? req.param('last_ts') : 0;
  afterTs = req.param('after_ts') ? req.param('after_ts') : 0;
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
  if(afterTs > 0){
    conditions.push({date: {'$lte' : afterTs}});
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