var mongoose = require('mongoose');
module.exports = mongoose.model('Activity',{

activityId :String,
userId :String,
email:String,
userName:String,
image:String,
posts:{

},
follow :{

followerId:String,
followerName:String,
followerEmail:String,
followerPhoto:String

},
review :{

productId:String,
productTitle:String,
productPhoto:String,
rating:String,
review:String,

},
liked :{

activityId :String

},
commented:{

activityId :String
},

progress :{

productId :String

},
wantToPlay :{

	
	productId:String
},
startedPlaying :{

productId:String

},
hasPlayed :{

productId:String

},
currentlyPlaying :{

	
productId:String
},
finishedPlaying:{
productId:String
},

comments :[{

commenterId:String,
commenterName :String,
commenterEmail:String,
commenterPhoto:String,
commentText:String,
date :{type:Date,default:Date.now }

}],

upvotes:[{userId:String,userName:String,userEmail:String,userPhoto:String,date:{type:Date,default:Date.now}}],

date :{type:Date ,default:Date.now},

	
});