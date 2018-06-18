/* eslint-disable */
'use strict'
let apiPath = 'localhost:5000/api/'
var mainApp = angular
    .module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController'
    });
    $routeProvider.when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserController'
    });
    $routeProvider.when('/post/:postId', {
        templateUrl: 'views/post.html',
        controller: 'PostController'
    });
    $routeProvider.when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsController'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
    // use the HTML5 History API - Removing '#'
    $locationProvider.html5Mode(true);
}]);