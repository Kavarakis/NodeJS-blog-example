angular
    .module('HomeCtrl',['services','angular-storage'])
    .controller('HomeController',['$scope','$location','$http','loginService','$timeout','authService',
        function ($scope, $location, $http, loginService,$timeout,authService) {
            $scope.welcomeMessage = 'Welcome to Simple Blog App!';
            $scope.message = false;
            $scope.posts = [];
            $scope.submitForm = function(isValid) {
                // check to make sure the form is completely valid

                if (isValid) {
                    loginService.login($scope.user.email,$scope.user.password)
                        .then((result)=>{
                           $scope.message = result.data.message.msg;
                           if(result.status === 200){
                               $timeout(function() {
                                   authService.setToken(result.data.token);
                                   $location.path('user');
                               }, 1500);
                           }
                        });
                }
            };
        }
        ]
    );