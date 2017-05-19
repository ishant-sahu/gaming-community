var Activity = require('../datasets/Activity');
module.exports.getActivity = function(req,res){


		//console.log(req.body);
		
		var requestedActivities = [];
		
		for(var i=0 ,len = req.body.length; i < len ;i++){
			
			
			requestedActivities.push({email:req.body[i].email});

		}
		requestedActivities.push({email:req.user.email});
	//	console.log(requestedActivities);

		//console.log(requestedActivities);
		
		Activity.find({$or:requestedActivities})
		.sort({date : -1})
		.exec(function(err,allActivities){

			if(err){
				res.error(err);
			}
			else{
			//	console.log(allActivities);
			res.json(allActivities);
		}
	})

	};

	module.exports.postComment = function(req,res){

		activityId = req.body.activityId;
		comment = req.body.comment;

		Activity.find({activityId:activityId},function(err,response){

			if(err)
				console.log(err);

			response[0].comments.push(comment);
			response[0].save(function(error,data){

				if(err)
					console.log(err);
		//console.log(data);
	})
		})


	}

	module.exports.postUpvote = function(req,res){

		activityId = req.body.activityId;
		upvote = req.body.upvote;

		Activity.find({activityId:activityId},function(err,response){

			if(err)
				console.log(err);

			response[0].upvotes.push(upvote);
			response[0].save(function(error,data){

				if(err)
					console.log(err);
				/*console.log(data);*/
			})
		})





	}

	module.exports.removeUpvote = function(req,res){

		activityId = req.body.activityId;
		upvote = req.body.upvote;
//console.log(upvote.userId);

Activity.update({"activityId":activityId},{$pull:{upvotes :{userId:upvote.userId}}},function(err,data){

	if(err)
		console.log(err);
	/*	console.log(data);*/

});


}

module.exports.getActivityForProfile = function(req,res){


	Activity.find({email:req.body.email},function(err,response){

		if(err)
			console.log(err);
		res.json(response);

	});


}





