angular.module('profile')
.factory('UserService', function() {
 var savedData = {}
 function setProfile(data) {
   savedData = data;

   console.log(data);

 }
 function getProfile() {
 	console.log(savedData);
  return savedData;
 }

 return {
  setProfile: setProfile,	
  getProfile: getProfile
 }

});