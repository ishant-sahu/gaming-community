var mongoose = require('mongoose');
module.exports = mongoose.model('UserGameData',{

	email :String,
	displayName :String,
	image:String,
	psnId :String,
	gamerTag :String,
	psnData :{
		onlineId:String,
		region:String,
		npId:String,
		avatarUrl:String,
		aboutMe:String,
		languagesUsed:String,
		plus:{type:Number,default:0},
		trophySummary:{level:{type:Number,default:1},progress:{type:Number,default:0},
		earnedTrophies:{platinum:{type:Number,default:0},
		gold:{type:Number,default:0},
		silver:{type:Number,default:0},
		bronze:{type:Number,default:0}}},
		relation:String,
		presence:{primaryInfo:{onlineStatus:String,lastOnlineDate:{type:Date}}},
		personalDetail:{firstName:String,lastName:String},
		usePersonalDetailInGame:{type:Boolean,default:false}

	},
	xboxData :{
		id:{type:Number,default:0},
		hostId:String,
		GamerTag:String,
		GameDisplayName:String,
		AppDisplayName:String,
		Gamerscore:	{type:Number,default:0},
		GameDisplayPicRaw:String,
		AppDisplayPicRaw:String,
		AccountTier:String,
		XboxOneRep:String,
		PreferredColor:String,
		TenureLevel:String,
		isSponsoredUser:{type:Boolean,default:false}




	},
	steamData :{


	},
	date:{type:Date ,default:Date.now}

});