import angularStorage from 'angular-storage';
import angularJwt from 'angular-jwt';
import userService from './userService';

export default angular.module('user', [
        angularStorage,
        angularJwt
    ])
    .factory('userService', userService);