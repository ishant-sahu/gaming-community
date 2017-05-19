'use strict';

var app = angular.module('product');




app.controller('RatingController', ['$scope','$rootScope','$http', function ($scope,$rootScope,$http) {
    $scope.starRating1 = 4;
    $scope.starRating2 = 5;
    $scope.starRating3 = 1;
    $scope.rating =1;
    $scope.averageRating = 0;
    $scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

    if(localStorage['User-Data'] !== undefined )
        $rootScope.user = JSON.parse(localStorage['User-Data']);

    $scope.click1 = function (param) {
        console.log('Click(' + param + ')');
    };

    $scope.mouseHover1 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave1 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating1 = param + '*';
    };

    $scope.click2 = function (param) {
        console.log('Click');
    };

    $scope.mouseHover2 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave2 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating2 = param + '*';
    };

    $scope.click3 = function (param) {
        console.log('Click');
        console.log(param);
        $rootScope.rating =  param;




    };

    $scope.submitReview = function(){


        console.log($scope.rating);
        console.log($scope.review);
        console.log($rootScope.product);
        console.log($rootScope.user.userId);


        var request = {

            productId: $rootScope.product[0]._id,
            productTitle :$rootScope.product[0].Title,
            userId : $rootScope.user.userId,
            rating : $scope.rating,
            review : $scope.review,
            productPhoto:$rootScope.product[0].image,
            userPhoto:$rootScope.user.image,
            userName:$rootScope.user.displayName,
            email:$rootScope.user.email

        }
        console.log(request);
        $http.post('/api/product/postReview',{productReview:request}).success(function(response){

            console.log(response);
            
        }).error(function(error){

            console.error(error);
        })

        
    }


    $scope.onInit = function(id,gameName){

        var obj = {_id :id,gameName : gameName};

       // console.log(obj);
       // $rootScope.product = obj;

        $http.post('/api/product/getDetails',obj).success(function(response){

            //console.log(response);
            $rootScope.product = response;
            console.log($scope.product);
        });



    }

    $scope.mouseHover3 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating3 = param;
        $scope.rating = param;
    };

    $scope.mouseLeave3 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating3 = param + '*';
    };
}]);

app.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
        "<div  style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
        <img class='img-responsive' ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
        ng-Click='isolatedClick($index + 1)' \
        ng-mouseenter='isolatedMouseHover($index + 1)' \
        ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
        </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;

            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({
                   param: param
               });
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({
                   param: param
               });
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({
                   param: param
               });
            };
        }
    };
});


