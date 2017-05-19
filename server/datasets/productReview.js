var mongoose = require('mongoose');
module.exports = mongoose.model('productReview',{

	
	productId :String,
	productTitle :String,
	userId:String,
	rating :Number,
	review :String,
	productPhoto:String,
	userPhoto:String,
	userName:String,
	email:String,
	date :{type:Date ,default:Date.now}

});
