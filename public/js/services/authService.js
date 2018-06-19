angular.module('services')
.factory('authService',['store','jwtHelper',function (store,jwtHelper) {
    let authService ={};
    authService.tokenPayload = function () {
        return (jwtHelper.decodeToken(store.get('jwt')));
    };
    authService.getToken = function () {
        return (store.get('jwt'));
    };
    authService.getHeaders = function () {
        return {
            'Authorization': ('Bearer ' + store.get('jwt'))
        };
    };
    authService.setToken = function (token) {
        store.set('jwt',token);
    };
    return authService;
}]);