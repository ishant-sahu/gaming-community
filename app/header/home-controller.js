(function(){

angular.module('myModule')
.controller('HomeController',['$scope','$state','$http',function($scope,$state,$http){


			$http.get('/home').success(function(response){
				console.log(response);
				
			

			}).error(function(error){


				console.log(error);
			});
		


}]);

}());