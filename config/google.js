var configPath = require('./auth');
var Users = require('../server/datasets/UsersData');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleContacts = require('./google-contact-list');
var downloadImage = require('./downloadImage');
var uuid = require('node-uuid');





module.exports = function(passport){

  passport.use(new GoogleStrategy({
    clientID: configPath.googleAuth.clientId,
    clientSecret: configPath.googleAuth.clientSecret,
    callbackURL: configPath.googleAuth.callbackURL
   // profileFields: ['id','birthday', 'email', 'gender','displayName' ,'link', 'locale','cover', 'name', 'timezone', 'updated_time', 'verified']
 },
 function(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
   // console.log(profile);
   // console.log(accessToken);

   
   Users.findOne({'google.id':profile.id}, function(err, user) {

    if (err) { return done(err); }
    if(user){


      return done(null,user);

    }
    else{


      var newUser = new Users();
      newUser.google.id = profile.id;
      newUser.google.token = accessToken;
      newUser.google.name = profile.name.givenName;
      newUser.google.lname = profile.name.familyName;
      newUser.google.email = profile.emails[0].value;
      newUser.google.gender = profile.gender;
      newUser.google.link = profile._json.url;
      newUser.displayName = profile.displayName;
      newUser.email = profile.emails[0].value;

       var filename = uuid.v4()+'.jpg';
       newUser.image =  filename;
       var photoUrl = profile.photos[0].value;
       photoUrl = photoUrl.split("?")[0];
       photoUrl = photoUrl+'?sz=200';



       
       
       downloadImage.download(photoUrl,filename,function(res){


     GoogleContacts.getGoogleData(accessToken,'/v1/people/me/connections',function(response){
        response  =  JSON.parse(response);
       // console.log(response);
       newUser.save(function(err,user){

        if(err)
          console.log(err);


        for(var i=0;i<response.connections.length;i++){

          GoogleContacts.getGoogleData(accessToken,'/v1/'+response.connections[i].resourceName,function(userInfo){
            userInfo = JSON.parse(userInfo);
           //    console.log(userInfo);
           Users.findOne({'google.id':user.google.id},function(err,data){

            if(err)
              console.log(err);
            // console.log(userInfo);

            var mail,displayName,ph,resource;
            if(userInfo.hasOwnProperty('emailAddresses'))
              mail = userInfo.emailAddresses[0].value;
            if(userInfo.hasOwnProperty('names'))
              displayName = userInfo.names[0].displayName;
            if(userInfo.hasOwnProperty('phoneNumbers'))
              ph = userInfo.phoneNumbers[0].canonicalForm;
            if(userInfo.hasOwnProperty('resourceName'))
              resource= userInfo.resourceName;

            data.google.friendList.push({friendName:displayName,email:mail,phone:ph,resourceName:resource,follower:"0",following:"0"});
            data.save();
          });



         });


        }

        return done(null,user);


      });


});

});
}

});
}

)}));

};

