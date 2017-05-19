var mongoose = require('mongoose');
module.exports = mongoose.model('Users',{

	email :String,
	displayName :String,
	image:String,
	
	
	facebook:{id:String,
		token:String,
		name:String,
		lname:String,
		email:String,
		gender:String,
		link:String,
		friendList:[{friendName :String,friendId:String,follower:String,following:String}]
	},

	google:{
		id:String,
		token:String,
		name:String,
		lname:String,
		email:String,
		gender:String,
		link:String,
		friendList:[{friendName :String,friendId:String,phone:String,email:String,resourceName:String,follower:String,following:String}]
	},
	followers :[{userId:String,userName:String,email:String}],
	following :[{userId:String,userName:String,email:String}],
	date :{type:Date ,default:Date.now}

});

