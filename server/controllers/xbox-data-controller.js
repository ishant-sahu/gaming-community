var xboxapiv2 = require('node-xboxapiv2')('848b56b5f1ceee17d03a2e56db13b458d944dadf');

module.exports.getProfileFromXuid = function(req,res){

	xboxapiv2.get(
		'Profile',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );
}

module.exports.getActivityFromXuid = function(req,res){
	xboxapiv2.get(
		'Activity',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getFollowersFromXuid = function(req,res){
	xboxapiv2.get(
		'Followers',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getFriendsFromXuid = function(req,res){
	xboxapiv2.get(
		'Friends',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getGameClipsFromXuid = function(req,res){
	xboxapiv2.get(
		'GameClips',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getGameStatsFromXuidAndTitleId = function(req,res){
	xboxapiv2.get(
		'GameStats',
		{ xuid: req.params.xuid ,titleId:req.params.titleId},
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getGamerCardFromXuid = function(req,res){
	xboxapiv2.get(
		'Gamercard',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getXuidFromGamerTag = function(req,res){

	//console.log(req.params.gamertag);
    console.log(req);
	xboxapiv2.get(
		'GamertagXUID',
		{ gamertag: req.params.gamertag },
		function(err, response) {
        //handle response
       // if(err)console.log(err);
       console.log(response);
       


        xboxapiv2.get(
        'Profile',
        { xuid: response },
        function(err, data) {
        //handle response
        res.json(data);
    });


    });

}

module.exports.getGamerTagFromXuid = function(req,res){
	console.log(req.params.xuid);
	xboxapiv2.get(
		'XUIDGamertag',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        console.log(response);
        res.json(response);
    }
    );

}

module.exports.getPresenceFromXuid = function(req,res){
	xboxapiv2.get(
		'Presence',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getRecentActivityFromXuid = function(req,res){
	xboxapiv2.get(
		'RecentActivity',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getGameClipsSavedFromXuid = function(req,res){
	xboxapiv2.get(
		'SavedGameClips',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}



module.exports.getXbox360GamesFromXuid = function(req,res){
	xboxapiv2.get(
		'Xbox360Games',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}


module.exports.getAchievementsFromXuidAndTitleId = function(req,res){
	xboxapiv2.get(
		'XboxGameAchievements',
		{ xuid: req.params.xuid,titleId:req.params.titleId },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getXboxOneGamesFromXuid = function(req,res){
	xboxapiv2.get(
		'XboxONEGames',
		{ xuid: req.params.xuid },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}

module.exports.getGameInfoHexFromGameId = function(req,res){
	xboxapiv2.get(
		'XboxGameInformationHEX',
		{ game_id: req.params.game_id },
		function(err, response) {
        //handle response
        res.send(response);
    }
    );

}





