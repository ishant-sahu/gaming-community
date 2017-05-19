var configPath = require('./auth');
var Users = require('../server/datasets/UsersData');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookFriends = require('./facebook-friend-list');
var downloadImage = require('./downloadImage');
var uuid = require('node-uuid');

// Generate a v4 (random) UUID




module.exports = function(passport){

  passport.use(new FacebookStrategy({
    clientID: configPath.facebookAuth.clientId,
    clientSecret: configPath.facebookAuth.clientSecret,
    callbackURL: configPath.facebookAuth.callbackURL,
    profileFields: ['id','birthday', 'email', 'gender','displayName' ,'link', 'locale','cover', 'name', 'timezone', 'updated_time', 'verified']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
    // console.log(profile);
   // console.log(accessToken);

   
   Users.findOne({'facebook.id':profile.id}, function(err, user) {

    if (err) { return done(err); }
    if(user){

    /*  facebookFriends.getFbData(accessToken,'/me/friends',function(response){
        response  =  JSON.parse(response);

        for(var i = 0 ;i < response.data.length;i++){

          if(!user.facebook.friendList.contains(response.data[i].id)){
            user.facebook.friendList.push({friendName:response.data[i].name,friendId:response.data[i].id });
          }



        }

        user.save(function(err,user){

         if(err)
          return err;

        
      });

});*/

return done(null,user);

}
else{


  var newUser = new Users();
  newUser.facebook.id = profile.id;
  newUser.facebook.token = accessToken;
  newUser.facebook.name = profile.name.givenName;
  newUser.facebook.lname = profile.name.familyName;
  newUser.facebook.email = profile.emails[0].value;
  newUser.facebook.gender = profile.gender;
  newUser.facebook.link = profile.link;
  newUser.displayName = profile.displayName;
  newUser.email = profile.emails[0].value;



      //  console.log(accessToken);

      var filename = uuid.v4()+'.jpg';

      
      newUser.image =  filename;
      downloadImage.download('http://graph.facebook.com/'+profile.id+'/picture?width=200&height=200',filename,function(res){



       

        facebookFriends.getFbData(accessToken,'/me/friends',function(response){
          response  =  JSON.parse(response);
        //  console.log(response);
          for(var i = 0 ;i < response.data.length;i++){

            newUser.facebook.friendList.push({friendName:response.data[i].name,friendId:response.data[i].id ,follower:"0",following:"0"});

            Users.findOne({'facebook.id':response.data[i].id},function(err,friendUser){
              if(err)
                console.log(err);
              if(friendUser){
                friendUser.facebook.friendList.push({friendName:profile.displayName,friendId:profile.id,follower:"0",following:"0"});
                friendUser.save();


              }


            });

          }


          newUser.save(function(err,user){

           if(err)
            return err;

          return done(null,user);
        });

        });

        


      });



      




    }

  });
}

)}));

};

