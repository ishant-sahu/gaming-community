var UserGameData = require('../datasets/userGameData');
var Users = require('../datasets/UsersData');

module.exports.getProfileNetworkDetails = function(req,res){

//console.log(req);

UserGameData.find({email:req.body.email},function(err,response){

	if(err)
		console.log(err)

	
	res.json(response);




});
}

module.exports.postPSNData = function(req,res){

//console.log(req);

UserGameData.find({email:req.body.email},function(err,response){

	if(err)
		console.log(err);

	if(response.length == 0){

		var userGameData = new UserGameData(req.body);
		userGameData.save(function(error,data){

			if(error)
				console.log(error);
			
			//console.log(data);
		});

	}else{
		//console.log(response);
		response[0].psnData=req.body.psnData;


		response[0].save(function(err,newData){

			if(err)
				console.log(err)

			res.json(response);
		});


	}

})





}

module.exports.postXboxData = function(req,res){

	UserGameData.find({email:req.body.email},function(err,response){

		if(err)
			console.log(err);

		if(response.length == 0){

			var userGameData = new UserGameData(req.body);
			userGameData.save(function(error,data){

				if(error)
					console.log(error);
				//console.log(data);
			});

		}else{
			//console.log(response);
			response[0].xboxData=req.body.xboxData;
			var storeXboxData = response[0];

			response[0].save(function(err,newData){

				if(err)
					console.log(err)

				res.json(response);
			});


		}

	})




}

module.exports.getUserData = function(req,res){


	Users.find({_id:req.body._id},function(err,response){
		//console.log(response);
		res.json(response);
		  



	});


}




