(function(){

	angular.module('app')
	.controller('SearchController',['$scope','$http','$state','MovieRetriever','$window',
		function($scope,$http,$state,MovieRetriever,$window){

		
		$scope.movies = MovieRetriever.getmovies("...");
		$scope.movies.then(function(data){
			$scope.movies = data;
		//	console.log(data);
	});



	$scope.getmovies = function(){
			return $scope.movies;
		}
	$scope.doSomething = function(typedthings){
		//	console.log("Do something like reload data with this: " + typedthings );
		$scope.newmovies = MovieRetriever.getmovies(typedthings);
		$scope.newmovies.then(function(data){
			$scope.movies = data;
		});
	}

	$scope.doSomethingElse = function(suggestion){
		console.log("Suggestion selected: " + suggestion.Title );



		$window.location.href = 'http://localhost:3000/products/show/'+suggestion._id+'/'+suggestion.Title;

	}

}]);

}());