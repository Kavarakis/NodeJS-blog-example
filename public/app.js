/* eslint-disable */
'use strict'
let apiPath = 'localhost:5000/api/';
var mainApp = angular
    .module('mainApp', ['ngRoute','controllers','services']);

mainApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserController'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
    // use the HTML5 History API - Removing '#'
    $locationProvider.html5Mode(true);
}]);