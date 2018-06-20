angular
    .module('RegisterCtrl', ['services'])
    .controller('RegisterController', ['$scope', '$location', '$timeout', 'userService',
        function ($scope, $location, $timeout, userService) {
            $scope.message = false;

            $scope.submitForm = function (isValid) {
                // check to make sure the form is completely valid
                if (isValid) {
                    userService.create($scope.user)
                        .then((result) => {
                            $scope.message = result.data.message;
                            if (result.status === 201) {
                                $timeout(function () {
                                    $location.path('/');
                                }, 1500);
                            }
                        });
                }
            };
        }
    ]);