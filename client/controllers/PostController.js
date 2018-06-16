angular
    .module('mainApp')
    .controller('PostController', ['$scope', '$routeParams', 'PostService',
        function ($scope, $routeParams, PostService) {

            PostService.getOne($routeParams.postId)
                .then((result) => {
                    $scope.post = result;
                });
        }
    ]);