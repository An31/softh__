const express = require('express');
const router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
var Twit = require('twit');
var mongodb = require('mongodb');
var isLocal = 0;

	//var mongo_url = "mongodb://localhost:27017/postsdb" // for 2.2.33, without /postsdb for 3.0.33
	// var mongo_url =	"mongodb://"+process.env.MONGO_USER_NAME+":"+process.env.MONGO_USER_PASS+"@ds227858.mlab.com:27858/postsdb" // created instance on mlab.com
	//var mongo_url = "mongodb://admin:admin@ds131698.mlab.com:31698/heroku_0b58wn4t" // from softh app

var mongo_url =process.env.MONGODB_URI || "mongodb://localhost:27017/postsdb";
console.log(mongo_url)

/* GET home page. */
const viewPath = path.join(__dirname+'/../views/pages');



router.get('/', function(req, res, next) {
	var T = new Twit({
	  consumer_key:         process.env.CONSUMER_KEY,
	  consumer_secret:      process.env.CONSUMER_SECRET,
	  access_token:         process.env.ACCESS_TOKEN,
	  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
	  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	});
	var parameters = { 
			q: 'banana since:2011-07-11',
			lang: 'eu',
			count: 1 
	};
	T.get('search/tweets',parameters , getTweetData);
	
	function getTweetData(err,data,response){
		var tweets = data.statuses;
		if(typeof tweets !=='undefined')
		{
			if(tweets.length)
			{
				console.log("Tweets length !==0");
				
				
			// Insert fetched tweets
					for(var i=0;i<tweets.length; i++)
					{
						console.log(tweets[i].text);
					
					}
				res.render(path.join(viewPath,'index'), { title: 'Softhouse', data: tweets });
					/*
				// Store current tweets inside mongodb and show them all
			var mongo = mongodb.MongoClient; // create a new client
			// Connect with a client to url, if not connected => err, if connected = > specifed db from url
			mongo.connect(mongo_url,function(err,db){ // client instead db for  3.0.22 mongodb
				if(err){
					console.log("Cannot connect to a mongod server.");
				}
				else{
					console.log("Connected to a mongod server.");
					console.log("Switched to the "+db.databaseName+" database.");
					// var db = client.db('postsdb'); // used for 3.0.22 mongodb
					
					// Drop collection first
					//db.collection('posts').drop();
					// Create a new collection
					//db.createCollection("posts", function(err, result) {
					//	if (err) throw err;
					//	console.log("Collection is created!");
					//});
					
					// Use already created collection "posts" from db "postdb"
					var posts = db.collection('posts');
					// Insert fetched tweets
					for(var i=0;i<tweets.length; i++)
					{
						console.log(tweets[i].text);
					
						posts.insert({"text":tweets[i].text},function(err,result){
							if(err){
								console.log("There was an error while inserting tweets. ");
							}
							else{
								console.log("Tweets are inserted in mongodb.");
							}
						
						});
					}
					// Find all data from mongodb and send them to html.
					posts.find({}).toArray(function(err,result){
						if(err){
							console.log("Cannot find posts collection or similar error.")
						}
						else if(result.length){
							// Show current tweets
							res.render(path.join(viewPath,'index'), { title: 'Softhouse', data: result }); 
							console.log("Data are sent to html.")
						}
						else{
							console.log("There are no data presented!");
						}
						db.close();
						// client.close();
					});
				}
				
				
			}); // mongo.connect
			*/
			}
			else{
				console.log("Tweets length ==0");
			}
			
		} // if !undefined
	} // getTweetData()
});

/*
router.post('/addData',function(req,res){
	console.log("New data is : "+req.body.new_data);
		// Store current tweets inside mongodb and show them all
			var mongo = mongodb.MongoClient; // create a new client
			// Connect with a client to url, if not connected => err, if connected = > specifed db from url
			mongo.connect(mongo_url,function(err,db){ // client instead db for  3.0.22 mongodb
				if(err){
					console.log("Cannot connect to a mongod server.");
				}
				else{
					console.log("Connected to a mongod server.");
					// Use already created collection "posts" from db "postdb"
					var posts = db.collection('posts');
					// Insert new data
					posts.insert({"text":req.body.new_data},function(err,result){
						if(err){
							console.log("There was an error while inserting new data from user. ");
						}
						else{
							console.log("New data from user are inserted in mongodb.");
						}
					});
				}
				
				db.close();
			}); // mongo.connect
			
	res.redirect('/new_data'); 
});

router.get('/new_data',function(req,res,next){
	
// Show new data from database
	var mongo = mongodb.MongoClient; // create a new client
	// Connect with a client to url, if not connected => err, if connected = > specifed db from url
	mongo.connect(mongo_url,function(err,db){ // client instead db for  3.0.22 mongodb
		if(err){
			console.log("Cannot connect to a mongod server. New data");
		}
		else{
			console.log("Connected to a mongod server. New data");
			// Use already created collection "posts" from db "postdb"
			var posts = db.collection('posts');
			// Find all data from mongodb and send them to html.
			posts.find({}).toArray(function(err,result){
				if(err){
					console.log("Cannot find posts collection or similar error. New data")
				}
				else if(result.length){
					// Show current tweets
					res.render(path.join(viewPath,'index'), { title: 'Softhouse New data', data: result }); 
				}
				else{
					console.log("There are no new data presented!");
				}
				db.close();
				// client.close();
			});
		}

	}); // mongo.connect
			
});
*/
module.exports = router;