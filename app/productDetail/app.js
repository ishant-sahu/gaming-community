(function(){
    angular.module('product',['ui.router','ngFileUpload'])
    .config(function($stateProvider,$urlRouterProvider){

        //console.log($rootScope.user);

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
            templateUrl:"app/productDetail/views/main.html",
            controller:"RatingController"
        })
        .state('follow',{

            url:"/follow-users",
            templateUrl:"app/follow/follow.html",
            controller:"FollowController"
        })


    })


}());