var gumerPSN  = require('gumer-psn/psn');
var idregex 	= /[A-Za-z0-9].{2,15}/;




gumerPSN.init({     // Our PSN Module, we have to start it once. - irkinsander
    debug:      true                    // Let's set it true, it's still in early development. So, report everything that goes wrong please.
    ,email:     "jeevannitt77@gmail.com"          // A valid PSN/SCE account (can be new one) // TODO: Using the user's credentials to do this.
    ,password:  "Jeevan_1"         // Account's password, du'h
    ,npLanguage:"en"                    // The language the trophy's name and description will shown as
    ,region:    "us"                    // The server region that will push data
});




module.exports.getData = function(req,res){


	gumerPSN.getProfile(req.params.id, function(error, profileData) {
		if (!error) {
			console.log(profileData);
			res.send(profileData)
		}
		else {
			if (profileData.error.code == 2105356) {	// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: profileData
				})
			}
		}
	});



}

module.exports.getTrophiesForPSN = function(req,res){

gumerPSN.getTrophies(req.params.id, "m", 0, 100, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})

}


module.exports.getGameTrophiesForPSN = function(req,res){

gumerPSN.getGameTrophies(req.params.id, req.params.npCommID, '', function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	});

}


module.exports.getGameTrophyGroupsForPSN = function(req,res){


gumerPSN.getGameTrophyGroups(req.params.id, req.params.npCommID, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})

}


module.exports.getGameTrophiesGroupsPSN = function(req,res){


gumerPSN.getGameTrophies(req.params.id, req.params.npCommID, req.params.groupID, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})

}

module.exports.getTrophyForPSN = function(req,res){

gumerPSN.getTrophy(req.params.id, req.params.npCommID, '', req.params.trophyID, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})

}