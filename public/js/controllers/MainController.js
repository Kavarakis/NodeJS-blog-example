angular
    .module('mainApp')
    .controller('MainController', ['$scope', '$location', function ($scope, $location) {
        $scope.message = 'Success';
    }]);