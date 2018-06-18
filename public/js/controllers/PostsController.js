angular
    .module('mainApp')
    .controller('PostsController', ['$scope', '$routeParams', 'PostService',
        function ($scope, $routeParams, PostService) {
            $scope.posts = [];
            PostService.getAll().then((result) => {
                $scope.posts = result;
            });
        }
    ]);