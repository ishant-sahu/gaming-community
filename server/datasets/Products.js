var mongoose = require('mongoose');
module.exports = mongoose.model('Products',{

	productId:String,
	Title: String,
	Genre:String,
	Description:String,
	ReleaseDate : String,
	platform:  String,
	image:String
	


});