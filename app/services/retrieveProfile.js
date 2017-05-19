angular.module('home')
.factory('retrieveProfileService', function(UserService) {
	function getProfile() {
		return UserService.getProfile();
	};

	 function setProfile() {
		UserService.setProfile('New value');
	}

	return {
		setProfile: setProfile,	
		getProfile: getProfile
	}

});