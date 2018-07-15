import angularStorage from 'angular-storage';
import angularJwt from 'angular-jwt';
import authService from './authService';

export default angular.module('auth', [
        angularStorage,
        angularJwt
    ])
    .factory('authService', authService);