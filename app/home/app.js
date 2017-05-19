(function(){
	angular.module('home',['ui.router','ngFileUpload','profile'])
	.config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('signup',{

			url:"/signup",
			templateUrl:"app/signup/signup.html",
			controller:"SignupController"
		})
		.state('editProfile',{

			url:"/edit-profile",
			templateUrl:"app/profile/edit-profile-view.html",
			controller:"EditProfileController"
		})
		.state('main',{

			url:"/",
			templateUrl:"app/home/views/main.html",
			controller:"HomeController"
		})
		.state('follow',{

			url:"/follow-users",
			templateUrl:"app/follow/follow.html",
			controller:"FollowController"
		})


	})


}());