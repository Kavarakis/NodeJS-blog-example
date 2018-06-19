angular.module('UserCtrl', ['services', 'angular-storage'])
    .controller('UserController', [
            '$scope', 'store', 'userService',
            function ($scope, store, userService) {
                $scope.user = false;
                $scope.message = false;
                $scope.token = store.get('jwt');
                $scope.init = function () {
                    $scope.navbar=true;
                    userService.getUser()
                        .then((result) => {
                            $scope.user = result.data.user;
                        });
                };
                $scope.submitForm = function (isValid) {
                    // check to make sure the form is completely valid

                    if (isValid) {
                        $scope.message = 'Submitted form!';
                        let obj = {
                            name: $scope.user.name,
                            surname:$scope.user.surname,
                            email: $scope.user.email,
                            password: $scope.user.password
                        };
                        userService.update(obj)
                            .then((result)=>{
                               $scope.message=result.data.message;
                            });
                    }

                };
            }
        ]
    );