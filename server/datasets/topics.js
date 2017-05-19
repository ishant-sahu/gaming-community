var mongoose = require('mongoose');
module.exports = mongoose.model('Topics',{

	topicId:String,
	topicName:String,
	games:[{productId:String,productTitle:String,productPhoto:String}],
	followers:[{userId:String,userName:String,email:String,image:String}],
	tags:[{tagname:String}],
	date:{type:Date,default:Date.now}

	

});

