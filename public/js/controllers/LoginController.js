'use strict';
angular
    .module('mainApp')
    .factory('Data', function () {
        let user = {
            name: null,
            surname: null,
            email: null,
            password: null,
            token: null
        };
        return user;
    })
    .controller('LoginController', ['$scope', '$http', '$location', 'Data',
        function ($scope, $http, $location, Data) {
            $scope.user = {};
            $scope.userResponse = {};
            $scope.message = 'Login Page';
            $scope.login = function () {

                let user = {
                    email: $scope.user.email,
                    password: $scope.user.password
                };
                $http.defaults.headers.post["Content-Type"] = "application/json";
                $http.post('/api/login', user)
                    .then(function (response) {
                        Data = response.data;
                        $location.url('user');
                    })
                    .catch(function (data) {
                        $scope.error = data;
                    });
            }
        }
    ]);