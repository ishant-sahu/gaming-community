(function(){


	angular.module('profile')
	.controller('MainController',['$scope','$http','$interval','$rootScope','$window','UserService',
		function($scope,$http,$interval,$rootScope,$window,UserService){

		//console.log($scope.rating.gameId);

		//$scope.psnAvail = true;
		/*$rootScope.ProfileUser = $window.user;
		console.log($rootScope.ProfileUser);*/


	$rootScope.ProfileUser = $window.user;
	
	//console.log($scope.shared);
	//console.log($window.user);


		if(localStorage['User-Data'] !== undefined )
		$rootScope.user = JSON.parse(localStorage['User-Data']);

		$scope.storeDataForSharing = function(){
			console.log($rootScope.ProfileUser);
		
			UserService.setProfile($rootScope.ProfileUser);
			//$scope.shared = UserService.getProfile();
			return false;
		}

		$scope.follow = function(looperId,looperName,looperEmail,looperPhoto){


			request= {

				userId : $rootScope.ProfileUser.userId,
				name : $rootScope.ProfileUser.name,
				lname : $rootScope.ProfileUser.lname,
				email:$rootScope.ProfileUser.email,
				displayName :$rootScope.ProfileUser.displayName,
				looperName : looperName,
				looperId : looperId,
				looperEmail :looperEmail,
				looperPhoto:looperPhoto,
				fb : $rootScope.ProfileUser.fb,
				google : $rootScope.ProfileUser.google,
				image:$rootScope.ProfileUser.image



			}
			$http.post('/api/users/follow',request).then(function(){

				console.log("following",looperId);
			})
		}

		$scope.unfollow = function(looperId,looperName,looperEmail,looperPhoto){

			request= {

				userId : $rootScope.ProfileUser.userId,
				name : $rootScope.ProfileUser.name,
				lname : $rootScope.ProfileUser.lname,
				email:$rootScope.ProfileUser.email,
				displayName :$rootScope.ProfileUser.displayName,
				looperName : looperName,
				looperId : looperId,
				looperEmail :looperEmail,
				looperPhoto:looperPhoto,
				fb : $rootScope.ProfileUser.fb,
				google : $rootScope.ProfileUser.google

			}
			//console.log(email);
			$http.post('/api/users/unfollow',request).then(function(){

				console.log("unfollowing",looperId);
			})
		}


		$scope.submitPSNId = function(){

			



			$http.get('/PSN/'+$scope.psnid).then(function(response){
				
				if(response.data.hasOwnProperty('message')){


				}
				else{
					console.log(response.data);
					request={email:$rootScope.ProfileUser.email,displayName:$rootScope.ProfileUser.displayName,image:$rootScope.ProfileUser.image,psnData:response.data};

					$http.post('/api/profile/postPSNData',request).then(function(response){
				//console.log(response.data);
				//$scope.users = response.data;

			});

				}
			});
		}

		$scope.submitXboxGamerTag = function(){

		//	console.log($scope.gamerTag);



		$http.get('/v2/xuid/'+$scope.gamerTag).then(function(response){
				//console.log(response.data);
			//	console.log(response.data);
			if(response.data.hasOwnProperty('error_message')){

			}
			else{
				console.log(response);
				
				request={email:$rootScope.ProfileUser.email,displayName:$rootScope.ProfileUser.displayName,image:$rootScope.ProfileUser.image,xboxData:response.data};

				$http.post('/api/profile/postXboxData',request).then(function(response){
				//console.log(response.data);
				//$scope.users = response.data;

				console.log(response);

			});

			}
		});

	}


$scope.checkIfLooperInMyFollowersList = function( looperEmail,followersArr){
				//console.log(followersArr);

				for(var i=0;i<followersArr.length;i++){
				//console.log(followersArr[i].email);
				if(followersArr[i].email == looperEmail )
					return true;
			}
			return false;


		}

		$scope.checkIfLooperInMyFollowingList = function( looperEmail,followingArr){
				console.log(followingArr);

				for(var i=0;i<followingArr.length;i++){
				//console.log(followersArr[i].email);
				if(followingArr[i].email == looperEmail )
					return true;
			}
			return false;


		}


	$scope.checkIfFollowing = function( followersArr){
				//console.log(followersArr);

				for(var i=0;i<followersArr.length;i++){
				//console.log(followersArr[i].email);
				if(followersArr[i].email == $rootScope.ProfileUser.email )
					return true;
			}
			return false;


		}

		$scope.checkIfFollowed = function( followingArr){
				//console.log(followersArr);

				for(var i=0;i<followingArr.length;i++){
				//console.log(followersArr[i].email);
				if(followingArr[i].email == $rootScope.ProfileUser.email )
					return true;
			}
			return false;


		}



		function checkIfPsnIdAvailable(){

			//console.log($rootScope.ProfileUser);
			var request = {email:$rootScope.ProfileUser.email}
			$http.post('/api/profile/getProfileNetworkDetails',request).then(function(response){
				//console.log(response.data);
				
				console.log(response);
				$scope.psnData = response.data[0].psnData;
				$scope.xboxData = response.data[0].xboxData;
				if(response.data.length == 0){
					$scope.psnAvail = false;
					$scope.xboxAvail=false;
				}
				else{

					if(response.data[0].psnData==null || response.data[0].psnData.onlineId==null)
						$scope.psnAvail = false;
					else {


						$scope.psnAvail = true;



						$http.get('/PSN/'+response.data[0].psnData.onlineId).then(function(response){
						//	$scope.psnData = response.data[0].psnData;
						request={email:$rootScope.ProfileUser.email,displayName:$rootScope.ProfileUser.displayName,image:$rootScope.ProfileUser.image,psnData:response.data};
						$http.post('/api/profile/postPSNData',request).then(function(response){
							//console.log("hello");
							//console.log(response);
						});


					});

						
					}

					if(response.data[0].xboxData==null ||response.data[0].xboxData.id == null )
						$scope.xboxAvail = false;
					else {
						$scope.xboxAvail = true;

						$http.get('/v2/xuid/'+response.data[0].xboxData.GameDisplayName).then(function(response){
							//$scope.xboxData = response.data[0].xboxData;

							request={email:$rootScope.ProfileUser.email,displayName:$rootScope.ProfileUser.displayName,image:$rootScope.ProfileUser.image,xboxData:response.data};
							$http.post('/api/profile/postXboxData',request).then(function(response){

							});
						});

						
					}


				}

			});
}


function getUsers(){



	$http.post('/api/users/getFriendsSuggestion',$rootScope.ProfileUser).then(function(response){
				//console.log(response.data);
				$scope.users = response.data;

			});
}



checkIfPsnIdAvailable();

getUsers();










}]);

}());