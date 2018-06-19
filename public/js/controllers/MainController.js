angular
    .module('MainCtrl',['angular-storage'])
    .controller('MainController', ['$scope','store', function ($scope, store) {
        $scope.navbar=false;
        $scope.message = 'Success';
        store.set('apiPath','http://localhost:5000/api/');
    }]);