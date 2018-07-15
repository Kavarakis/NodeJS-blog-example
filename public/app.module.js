/* eslint-disable */

/***LIBRARIES***/

import angular from 'angular';
import ngRoute from 'angular-route';
import angularJWT from 'angular-jwt';
import angularStorage from 'angular-storage';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

let apiPath = 'localhost:5000/api/';
let hostPath = "http://localhost:5000/";

/**** MODULE IMPORTS *****/
import registerModule from './components/register/register.module';
import userModule from './components/user/user.module';
import authModule from './components/authentication/auth.module';

console.log(process.env.NODE_ENV);
angular.module('app', [
        angularJWT,
        angularStorage,
        ngRoute,
        registerModule.name,
        userModule.name,
        authModule.name
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        // use the HTML5 History API - Removing '#'
        $locationProvider.html5Mode(true);
    }])