var Users = require('../datasets/UsersData');
var Activity = require('../datasets/Activity');
var uuid = require('node-uuid');




module.exports.getUsers = function  (req,res) {
var email  = req.user.email;
//console.log(req.body);


Users.find({"email":email},function(err,usersData){

	if(err){
		res.error(err);
	}else {
		//	console.log(usersData[0].facebook);
		var suggestions = [];
		var numQueries = 0;
		var i=0;
		for( ;i<usersData[0].facebook.friendList.length;i++){
			numQueries++;
				//console.log(usersData[0].facebook.friendList[i].friendId);
				Users.find({"facebook.id":usersData[0].facebook.friendList[i].friendId},function(err,response){
				//	console.log(response);
				numQueries--;
				suggestions.push(response);
				if(numQueries == 0)
					res.json(suggestions);
			});
			}

			if(i==0)
				res.json(suggestions);
		}




	});
}

module.exports.getFollowers =  function(req,res){

var userId = req.body.userId;
var email = req.body.email;
Users.find({"email":email},function(err,data){
//	console.log(data[0]);

res.json(data[0].following);

});


}


module.exports.follow = function(req,res){


	var userId = req.body.userId;
	var looperId = req.body.looperId;
	var looperName = req.body.looperName;
	var userName = req.body.name;
	var userLname = req.body.lname;
	var userPhoto = req.body.image;
	var google = req.body.google;
	var fb = req.body.fb;
	var looperPhoto = req.body.looperPhoto;
	var looperEmail = req.body.looperEmail;
	var name  = req.body.displayName;
	var activityId = "act"+uuid.v4();
	var email = req.body.email;
	//console.log(email);

	var follow = {followerId : looperId,followerName:looperName,followerEmail:looperEmail,followerPhoto:looperPhoto};
	var activity = new Activity({activityId:activityId,email:email,userName:name,image:userPhoto,userId:userId,follow:follow});




	//console.log(name);






	
	if(fb == "1"){
		Users.update({"facebook.id":userId,"facebook.friendList.friendId":looperId},{$set:{"facebook.friendList.$.following":"1"}},
			function(err,data){
				if(err)
					console.log(err);

				//console.log(data);


				

				Users.find({"facebook.id":userId},function(err,data){
					if(err)
						console.log(err);

					//console.log(data);
			//	console.log(data[0].following);
			data[0].following.push({userId:looperId,userName:looperName,email:looperEmail});
			data[0].save();

			activity.save();

		});





			});





		Users.update({"facebook.id":looperId,"facebook.friendList.friendId":userId},{$set:{"facebook.friendList.$.follower":"1"}},
			function(err,data){
				if(err)
					console.log(err);

			//	console.log(data);

			Users.find({"facebook.id":looperId},function(err,data){
				if(err)
					console.log(err);

				//	console.log(data[0]);
				data[0].followers.push({userId:userId,userName:name,email:email});
				data[0].save();

			});



		});
	}else{


		Users.update({"google.id":userId,"google.friendList.friendId":looperId},{$set:{"google.friendList.$.following":"1"}},
			function(err,data){
				if(err)
					console.log(err);

			//	console.log(data);

			Users.find({"google.id":userId},function(err,data){
				if(err)
					console.log(err);


				data[0].following.push({userId:looperId,userName:looperName,email:looperEmail});
				data[0].save();

				activity.save();


			});


		});





		Users.update({"google.id":looperId,"google.friendList.friendId":userId},{$set:{"google.friendList.$.follower":"1"}},
			function(err,data){
				if(err)
					console.log(err);

			//	console.log(data);

			Users.find({"google.id":looperId},function(err,data){
				if(err)
					console.log(err);
				data[0].followers.push({userId:userId,userName:name,email:email});
				data[0].save();

			});



		});

	}


}

module.exports.unfollow = function(req,res){


	var userId = req.body.userId;
	var looperId = req.body.looperId;
	var looperName = req.body.looperName;
	var userName = req.body.name;
	var userLname = req.body.lname;
	var google = req.body.google;
	var fb = req.body.fb;
	var name  = req.body.displayName;
	var looperEmail = req.body.looperEmail;
	var looperPhoto = req.body.looperPhoto;

	if(fb=="1"){
		Users.update({"facebook.id":userId,"facebook.friendList.friendId":looperId},{$set:{"facebook.friendList.$.following":"0"}},
			function(err,data){
				if(err)
					console.log(err);

				
				Users.update({"facebook.id":userId},{$pull:{following :{userId:looperId}}},function(err,data){

					if(err)
						console.log(err);
				/*	console.log(data);*/

				});

			});

		Users.update({"facebook.id":looperId,"facebook.friendList.friendId":userId},{$set:{"facebook.friendList.$.follower":"0"}},
			function(err,data){
				if(err)
					console.log(err);

			//	console.log(data);

			Users.update({"facebook.id":looperId},{$pull:{followers :{userId:userId}}},function(err,data){

				if(err)
					console.log(err);
				//console.log(data);
			});



		});





	}else{


		Users.update({"google.id":userId,"google.friendList.friendId":looperId},{$set:{"google.friendList.$.following":"0"}},
			function(err,data){
				if(err)
					console.log(err);

				//console.log(data);
				
				Users.update({"google.id":userId},{$pull:{following :{userId:looperId}}});



			});

		Users.update({"google.id":looperId,"google.friendList.friendId":userId},{$set:{"google.friendList.$.follower":"0"}},
			function(err,data){
				if(err)
					console.log(err);

				//console.log(data);

				Users.update({"google.id":looperId},{$pull:{followers :{userId:userId}}});


			});







	}
}