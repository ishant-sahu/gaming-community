var mongoose = require('mongoose');
module.exports = mongoose.model('Questions',{

	questionId:String,
	questionName:String,
	topicId:String,
	tags:[{String}],
	userId:String,

	date:{type:Date,default:Date.now}

	

});

