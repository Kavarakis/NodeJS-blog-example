angular.module('services')
    .factory('userService', ['$http', 'jwtHelper', 'authService', 'store', function ($http, jwtHelper, authService, store) {
        let UserService = {};

        UserService.getUser = () => {

            return $http.get((store.get('apiPath') + 'user/' + authService.tokenPayload().id), {
                    headers: authService.getHeaders()
                }).then((response) => {
                    return response;
                })
                .catch((err) => {
                    return err;
                });
        };
        UserService.update = (user) => {
            return $http.put((store.get('apiPath') + 'user/' + authService.tokenPayload().id), user, {
                    headers: authService.getHeaders()
                })
                .then((response) => {
                    return response;
                })
                .catch((err) => {
                    return err;
                });

        };
        UserService.create = (user) => {
            return $http.post((store.get('apiPath') + 'user/'), user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    return response;
                })
                .catch((err) => {
                    return err;
                });
        }
        return UserService;
    }]);