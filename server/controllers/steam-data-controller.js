var SteamApi = require('steam-api');

var optionalSteamId = '76561198341071973';  
var user = new SteamApi.User('43A27653A459D19D36D59C9EF2420C7F', optionalSteamId);
var userStats = new SteamApi.UserStats('43A27653A459D19D36D59C9EF2420C7F', optionalSteamId);
var news = new SteamApi.News('43A27653A459D19D36D59C9EF2420C7F');
var app = new SteamApi.App('43A27653A459D19D36D59C9EF2420C7F');
var player = new SteamApi.Player('43A27653A459D19D36D59C9EF2420C7F', optionalSteamId);
var inventory = new SteamApi.Inventory('43A27653A459D19D36D59C9EF2420C7F', optionalSteamId);
var items = new SteamApi.Items('43A27653A459D19D36D59C9EF2420C7F', optionalSteamId);
var appId = 5;
// Steam API Backpack
module.exports.steamData = function(req,res){

userStats.GetUserStatsForGame(appId, optionalSteamId).done(function(result){
  console.log(result);
});

}