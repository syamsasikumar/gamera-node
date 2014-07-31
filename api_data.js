define({ api: [
  {
    "type": "get",
    "url": "/feeds",
    "title": "Request soccer feeds",
    "name": "GetFeeds",
    "group": "Feed",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "field": "hide_news",
            "defaultValue": "0",
            "optional": true,
            "description": "<p>Hides news feeds from output.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "field": "hide_tweet",
            "defaultValue": "0",
            "optional": true,
            "description": "<p>Hides tweets from output.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "field": "hide_live",
            "defaultValue": "0",
            "optional": true,
            "description": "<p>Hides live feed from output.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "defaultValue": "1",
            "optional": true,
            "description": "<p>Page Number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "count",
            "defaultValue": "20",
            "optional": true,
            "description": "<p>Count of rows expected per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "after_ts",
            "optional": true,
            "description": "<p>Upper limit for timestamp.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "last_ts",
            "optional": true,
            "description": "<p>Lower limit from timestamp.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "search",
            "optional": true,
            "description": "<p>Keyword to search in title / description.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   [{\n      \"_id\":\"53d164d668425b29ecc809c8\",\n      \"title\":\"#Soccer #Livescore @ScoresPro: (UEFA-2QR) FC Groningen vs Aberdeen: 1-2 \",\n      \"link\":\"http://www.scorespro.com/soccer/livescore/fc-groningen-vs-aberdeen/24-07-2014/\",\n      \"guid\":\"9f9d9071d9e0072b831f02d577b51ac5\",\n      \"description\":\"Match Finished\",\n      \"thumbnail\":\"\",\n      \"date\":1406229555,\n      \"type\":\"live\",\n      \"source\":\"live-soccer\"\n    }]\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js"
  }
] });