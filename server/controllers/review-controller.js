var Review = require('../datasets/productReview');
var Activity = require('../datasets/Activity');
var uuid = require('node-uuid');

module.exports.postReview = function(req,res){
	
	var review = new Review(req.body.productReview);
	console.log(review);

	var rev = { productId:req.body.productReview.productId,
		productPhoto:req.body.productReview.productPhoto,
		rating:req.body.productReview.rating,
		review:req.body.productReview.review,
		productTitle:req.body.productReview.productTitle
	};
	var activityId = "act"+uuid.v1();

	var activity = new Activity({userId :req.body.productReview.userId,activityId:activityId,email:req.body.productReview.email,
		userName:req.body.productReview.userName,image:req.body.productReview.userPhoto,
		review : rev });

	review.save(function(err,data){

		if(err){
			console.log(err);
		}
		console.log(data);
		activity.save(function(err,activityResponse){

			if(err)
				console.log(err);
			console.log(activityResponse);
		})
		

	});

}