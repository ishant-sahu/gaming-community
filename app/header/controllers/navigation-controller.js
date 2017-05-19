(function(){

	angular.module('app')
	.controller('NavigationController',['$scope','$http','$state','$rootScope','$window',
		function($scope,$http,$state,$rootScope,$window){

		if (localStorage['User-Data']){

			$rootScope.loggedIn = true;
			$rootScope.user = JSON.parse(localStorage['User-Data']);
		} else {
			$rootScope.loggedIn = false;	
		}


		$scope.onLoad = function(name,lname,email,id,userId,fb,google,image,displayName){

		//$scope.userInfo = input;


		var user = {email:email,name:name,lname:lname,_id:id,userId:userId,fb:fb,google:google,image:image,displayName:displayName};
		$rootScope.user = user;

		if (localStorage['User-Data']){
			$rootScope.loggedIn = true;
		} else {
			$rootScope.loggedIn = false;	
		}

		localStorage.setItem('User-Data',JSON.stringify($rootScope.user));
		$rootScope.loggedIn=true;



		
	}

	$scope.logout = function(){

		localStorage.clear();
		$rootScope.loggedIn = false;
		$window.location.href = 'http://localhost:3000/signout';
	}

	$scope.goToProfile = function(){
		//UserService.set($rootScope.user)
		$window.location.href = 'http://localhost:3000/profile/show/'+$rootScope.user._id+'/'+$rootScope.user.name+'-'+$rootScope.user.lname;
	}


}]);

}());