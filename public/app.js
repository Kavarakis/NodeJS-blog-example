/* eslint-disable */
'use strict'
let apiPath = 'localhost:5000/api/';
let hostPath = "http://localhost:5000/";
var mainApp = angular
    .module('mainApp', ['ngRoute', 'controllers', 'services']);

mainApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/user', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        });
        $routeProvider.when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        // use the HTML5 History API - Removing '#'
        $locationProvider.html5Mode(true);
    }])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            if (next == current && (current !== hostPath)) {
                event.preventDefault();
                $location.path('/');
            }
        });
    }]);