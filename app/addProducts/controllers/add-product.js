(function(){

	var app = angular.module('app', ['ngFileUpload','ui.router']);

	app.controller('AddProductsController',['Upload','$scope','$http','$state','$location',
		function(Upload,$scope,$http,$state,$location){



			$scope.addProducts = function(){
/*
			$scope.title = inputTitle;
			$scope.genre  = inputGenre;
			$scope.description = inputDescription;
			$scope.release = inputRelease;
			$scope.platform = platform;*/
			file = $scope.file;

			if(file){

				Upload.upload({

					url:'api/products/addProducts',
					method:'POST',
					data:{newProduct:$scope.newProduct},
					file :file

				}).progress(function(evt){

					console.log("firing");

				}).success(function(data){

				}).error(function(error){

					console.log(error);
				})
			}

			/*$http.post('/api/products/addProducts',$scope.newProduct).success(function(response){

				console.log(response);

			}).error(function(error){


				console.log(error);
			})*/
}



}]);

}());