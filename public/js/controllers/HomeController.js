angular
    .module('mainApp')
    .controller('HomeController', ['$scope', '$location', '$http', 'PostService',
        function ($scope, $location, $http, PostService) {
            $scope.message = 'Welcome to Simple Blog App!';
            $scope.ChangeView = function () {
                $location.url('login');
            };
            $scope.posts = [];
            PostService.getAll().then((result) => {
                $scope.posts = result;
            });
        }
    ]);