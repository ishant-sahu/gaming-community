var express = require('express');
var router = express.Router();
var productsController = require('../server/controllers/product-controller');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
var url = require('url');
var jsonParser = bodyParser.json();
var jsonUrlencoded = bodyParser.urlencoded();
var path = require('path');
var friendController = require('../server/controllers/friend-controller');
var reviewController = require('../server/controllers/review-controller');
var activityController = require('../server/controllers/activity-controller');
var psnController = require('../server/controllers/psn-data-controller.js');
var xboxController =require('../server/controllers/xbox-data-controller.js');
var steamController = require('../server/controllers/steam-data-controller.js');
var profileController = require('../server/controllers/profile-controller.js');
var Users = require('../server/datasets/UsersData');

var multipartMiddleware = multipart();


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {

		if(req.user!==undefined){
			var obj;
			if(req.user.google.email == null){
				obj = { name:req.user.facebook.name, lname:req.user.facebook.lname, email:req.user.facebook.email, _id:req.user._id,userId:req.facebook.id,fb:"1",google:"0",image:req.user.image,displayName:req.user.displayName };
			}else{
				obj = { name:req.user.google.name,lname:req.user.google.lname,email:req.user.google.email,_id:req.user._id,userId:req.google.id,fb:"0",google:"1",image:req.user.image,displayName:req.user.displayName};

			}
			res.render('home',{user:obj});
		}

    	// Display the Login page with any flash message, if any
    	res.render('signup', { message: req.flash('message') });
    });

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('signup',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		
		var obj;
		if(req.user.google.email == null){
			obj = { name:req.user.facebook.name, lname:req.user.facebook.lname, email:req.user.facebook.email, _id:req.user._id,userId:req.user.facebook.id,fb:"1",google:"0",image:req.user.image,displayName:req.user.displayName };
		}else{
			obj = { name:req.user.google.name,lname:req.user.google.lname,email:req.user.google.email,_id:req.user._id,userId:req.user.google.id,fb:"0",google:"1",image:req.user.image,displayName:req.user.displayName};
			
		}
		//console.log(obj);

		res.render('home', {user:obj});
	});

	/*Add Product To Inventory*/
	router.get('/addProduct', isAuthenticated, function(req, res){
		res.render('addProduct');
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.post('/api/products/addProducts',multipartMiddleware,productsController.addProducts);
	router.get('/api/products/getProducts',productsController.getProducts);
	router.get('/api/products/getProductsForSearch',productsController.getProductsForSearch);
	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/auth/facebook', 
		passport.authenticate('facebook', { scope : 'email,public_profile,user_friends' }
			));

	// handle the callback after facebook has authenticated the user
	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
		);


	router.get('/auth/google', 
		passport.authenticate('google', { scope : ['profile', 'email','https://www.googleapis.com/auth/contacts.readonly'] }

			));

	// handle the callback after facebook has authenticated the user
	router.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
		);

	// route for twitter authentication and login
	// different scopes while logging in
	router.get('/login/twitter', 
		passport.authenticate('twitter'));

	// handle the callback after facebook has authenticated the user
	router.get('/login/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/twitter',
			failureRedirect : '/'
		})
		);

	/* GET Twitter View Page */
	router.get('/twitter', isAuthenticated, function(req, res){
		res.render('twitter', { user: req.user });
	});

	router.get('/products/show/:id/:game',isAuthenticated,jsonParser,jsonUrlencoded,function(req,res){
		
		var url_parts = url.parse(req.url,true);
		
	//	console.log(url_parts);
	//	console.log(req);
		//console.log(path.parse(url_parts.path));
		


		var pathParse = url_parts.path.split('/');
		console.log(pathParse);

		var obj = {_id:pathParse[3],name:pathParse[4]};

		
		res.render('productDetail',{product:obj});


	});

	router.get('/profile/show/:id/:name',isAuthenticated,jsonParser,jsonUrlencoded,function(req,res){


		
		var url_parts = url.parse(req.url,true);
		
	//	console.log(url_parts);
	//	console.log(req);
		//console.log(path.parse(url_parts.path));


		var pathParse = url_parts.path.split('/');
	//	console.log(pathParse);

		
		Users.find({_id:pathParse[3]},function(err,response){
			var obj = response;
			console.log(response);
		res.render('userProfile',{user:obj});

		})

		
		


	});

	/*PSN data*/
	router.get('/PSN/:id',psnController.getData);
	router.get('/PSN/:id/trophies',psnController.getTrophiesForPSN);
	router.get('/PSN/:id/trophies/:npCommID',psnController.getGameTrophiesForPSN);
	router.get('/PSN/:id/trophies/:npCommID/groups',psnController.getGameTrophyGroupsForPSN);
	router.get('/PSN/:id/trophies/:npCommID/groups/:groupID',psnController.getGameTrophiesGroupsPSN);
	router.get('/PSN/:id/trophies/:npCommID/:trophyID',psnController.getTrophyForPSN);

	/*Xbox data*/
	
	router.get('/v2/xuid/:gamertag',xboxController.getXuidFromGamerTag);
	router.get('/v2/:xuid/profile',xboxController.getProfileFromXuid);
	router.get('/v2/:xuid/gamercard',xboxController.getGamerCardFromXuid);
	
	router.get('/v2/:xuid/game-stats/:titleId',xboxController.getGameStatsFromXuidAndTitleId);
	router.get('/v2/:xuid/achievements/:titleId',xboxController.getAchievementsFromXuidAndTitleId);
	router.get('/v2/game-details-hex/:game_id',xboxController.getGameInfoHexFromGameId);
	router.get('/v2/:xuid/activity',xboxController.getActivityFromXuid);
	router.get('/v2/:xuid/followers',xboxController.getFollowersFromXuid);
	router.get('/v2/:xuid/friends',xboxController.getFriendsFromXuid);
	router.get('/v2/:xuid/game-clips',xboxController.getGameClipsFromXuid);
	router.get('/v2/gamertag/:xuid',xboxController.getGamerTagFromXuid);
	router.get('/v2/:xuid/xbox360games',xboxController.getXbox360GamesFromXuid);
	router.get('/v2/:xuid/xboxonegames',xboxController.getXboxOneGamesFromXuid);
	router.get('/v2/:xuid/presence',xboxController.getPresenceFromXuid);
	router.get('/v2/:xuid/activity/recent',xboxController.getRecentActivityFromXuid);
	router.get('/v2/:xuid/game-clips/saved',xboxController.getGameClipsSavedFromXuid);

	/*	router.get('/v2/:xuid/game-clips/:titleId',xboxController.getSavedGameClipsForXuidAndGameTitleId);
	router.get('/v2/game-clips/:titleId',xboxController.getGameClipsFromTitleId);
	router.get('/v2/:xuid/screenshots',xboxController.getScreenshotsFromXuid);
	router.get('/v2/:xuid/screenshots/:titleId',xboxController.getScreenshotsFromXuidAndTitleId);
	router.get('/v2/screenshots/:titleId',xboxController.getScreenshotsFromTitleId);
	router.get('/v2/game-details/:product_id',xboxController.getGameDetailsFromProductId);
	router.get('/v2/game-details/:product_id/addons',xboxController.getAddonsFromProductId);
	router.get('/v2/game-details/:product_id/related',xboxController.getRelatedInfoFromProductId);
	router.get('/v2/latest-xbox360-games',xboxController.getLatestXbox360Games);
	router.get('/v2/latest-xboxone-games',xboxController.getLatestXboxOneGames);
	router.get('/v2/latest-xboxone-apps',xboxController.getLatestXboxOneApps);
	router.get('/v2/xboxone-gold-lounge',xboxController.getXboxOneGoldLounge);
	router.get('/v2/browse-marketplace/xbox360/1?sort=releaseDate',xboxController.browseMarketPlaceFromXbox360);
	router.get('/v2/browse-marketplace/games/1?sort=releaseDate',xboxController.browseMarketPlaceFromXboxOne);
	router.get('/v2/browse-marketplace/apps/1?sort=releaseDate',xboxController.browseMarketPlaceFromXboxOneApps);
	router.get('/v2/:xuid/titlehub-achievement-list',xboxController.getTitleHubAchievementListFromXuid);*/
	


/*Steam Data*/
router.get('/steam/data/:id',steamController.steamData);



	

	router.post('/api/users/getFriendsSuggestion',friendController.getUsers);
	router.post('/api/users/follow',friendController.follow);
	router.post('/api/users/unfollow',friendController.unfollow);
	router.post('/api/users/getFollowers',friendController.getFollowers);
	router.post('/api/product/postReview',reviewController.postReview);
	router.post('/api/activity/get',activityController.getActivity);
	router.post('/api/product/getDetails',productsController.getProductDetails);
	router.post('/api/profile/getProfileNetworkDetails',profileController.getProfileNetworkDetails);
	router.post('/api/profile/postPSNData',profileController.postPSNData);
	router.post('/api/profile/postXboxData',profileController.postXboxData);
	router.post('/api/activity/postComment',activityController.postComment);
	router.post('/api/activity/postUpvote',activityController.postUpvote);
	router.post('/api/activity/removeUpvote',activityController.removeUpvote);
	router.post('/api/users/getUserInfo',profileController.getUserData);
	router.post('/api/activity/getActivityForProfle',activityController.getActivityForProfile);


	




	return router;
}

