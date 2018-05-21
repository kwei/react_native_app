var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');


router.use(cors());
router.options('*', cors());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

console.log("");
console.log("===================================");
console.log("Server is on at localhost:3001.");
console.log("===================================");

router.get('/', function(req, res, next) {
	/*res.format({
		'application/json': function(){
		    res.send({ id: 1, username: "HJ"});
		}
	});*/
});

router.post('/regist', function(req, res, next) {
	//res.sendStatus(200);
	console.log("");
	console.log("===================================");
	console.log("Get a regist req!");
	console.log("");
	console.log(req.body);
	console.log("===================================");

	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	if (req !== null){
		MongoClient.connect('mongodb://localhost:27017/Mydatabase', function(err, db) {
			if (err) {
				throw err;
			}else{
				db.collection('user').find().toArray(function(err, result) {
			      	if (err){
			        	throw err;
			    	}else{
			    		var i = 0;
			    		while(true){
			    			if(result[i] == undefined ){
			    				console.log("Hi, new friend! :)");
			    				db.collection('user').insert([
							  	{
							        username: req.body.username,
							        email: req.body.email,
							        password: req.body.password,
							    }]);
							    res.sendStatus(200);
			    				break;
			    			}else{
			    				if(result[i]['email'] == email && result[i]['password'] == password){
			    					console.log("I got you! ^^");
			    					console.log("You have been registed.");
			    					res.sendStatus(404);
			    					break;
			    				}
			    			}
			    			i++;
			    		}
			    	}
			    });
			}
		});
	}
});

router.post('/login', function(req, res, next) {
	//res.sendStatus(200);
	console.log("");
	console.log("===================================");
	console.log("Get a login req!");
	console.log("");
	console.log(req.body);
	console.log("===================================");

	var email = req.body.email;
	var password = req.body.password;

	if (req !== null){
		MongoClient.connect('mongodb://localhost:27017/Mydatabase', function(err, db) {
			db.collection('user').find().toArray(function(err, result) {
		      	if (err){
		        	throw err;
		    	}else{
		    		var i = 0;
		    		while(true){
		    			if(result[i] == undefined ){
		    				console.log("Not found :(");
		    				res.sendStatus(404);
		    				break;
		    			}else{
		    				if(result[i]['email'] == email && result[i]['password'] == password){
		    					console.log("I got you! ^^");
		    					res.sendStatus(200);
		    					break;
		    				}
		    			}
		    			i++;
		    		}
		    	}
		    });
		});
	}
});


module.exports = router;
