(function(){


	angular.module('home')
	.controller('HomeController',['$scope','$http','$interval','retrieveProfileService','UserService',
		function($scope,$http,$interval,retrieveProfileService,UserService){

			//console.log("hello");
		//$scope.ProfileUser = UserService.getProfile();
		console.log($scope.ProfileUser);

		if(localStorage['User-Data'] !== undefined )
			$scope.user = JSON.parse(localStorage['User-Data']);

		
		
		$scope.getNumber = function(num) {
			
			return new Array(num);   
		}

		$scope.postUpvote = function(activityId){

			var upvote ={
				userId:$scope.user.userId,
				userName:$scope.user.displayName,
				userPhoto:$scope.user.image,
				userEmail:$scope.user.email
			};
			var request = {activityId:activityId,
				upvote:upvote};

				$http.post('/api/activity/postUpvote',request,function(response){


					console.log(response);
				})


			} 


			$scope.removeUpvote = function(activityId){

				var upvote ={
					userId:$scope.user.userId,
					userName:$scope.user.displayName,
					userPhoto:$scope.user.image,
					userEmail:$scope.user.email
				};
				var request = {activityId:activityId,
					upvote:upvote};

					$http.post('/api/activity/removeUpvote',request,function(response){


						console.log(response);
					})


				}

				$scope.checkIfUpvoted = function(upvote){

					for(var i = 0;i<upvote.length;i++){
						if(upvote[i].userId == $scope.user.userId)
							return true;
					}
					return false;
				}

				$scope.submitComment = function(activityId,commentData){

			//var date = new Date().toISOString;
			var comment ={
				commenterId:$scope.user.userId,
				commenterName :$scope.user.displayName,
				commenterEmail:$scope.user.email,
				commenterPhoto:$scope.user.image,
				commentText:commentData,
				
			}
			
			var request = {

				activityId:activityId,
				comment:comment
				
				
			}

			$http.post('/api/activity/postComment',request,function(response){


				console.log(response);
			})


		}
		
		function getActivitiesForProfile(){



			$http.post('/api/activity/getActivityForProfle',$scope.ProfileUser).then(function(response){
				//console.log(response.data);
				$scope.activityForProfile = response.data;

			});
		}


		
		function getActivities(initial){
			var data = {};
			
			if($scope.user){
				

				data={_id:$scope.user._id,email:$scope.user.email};
				$http.post('/api/users/getFollowers',data).then(function(res){
					$scope.users = res.data;
					//console.log(res.data);




					$http.post('/api/activity/get',res.data).success(function (response){

						if(initial){

							$scope.activities = response;

							console.log(response);
						}else{

							if(response.length > $scope.activities.length){
								$scope.incomingActivities = response; 
							}
						}

					});
					

				});


				//data.following = angular.copy($scope.user.following);
				//data.following.push({userId: $scope.user._id});
			}
			//console.log(data);

			
			



		};

		$interval(function(){

			getActivities(false);
			if($scope.incomingActivities){
				$scope.difference = $scope.incomingActivities.length - $scope.activities.length;
			}
			console.log("this is working");

		},5000);

		$scope.setNewActivities = function(){


			$scope.activities =  angular.copy($scope.incomingActivities);
			$scope.incomingActivities = undefined;
		}

//Init
getActivities(true);
getActivitiesForProfile();


}]);

}());