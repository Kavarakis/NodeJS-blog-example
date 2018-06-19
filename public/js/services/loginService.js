angular.module('services')
    .factory('loginService', ['$http','store',
        function ($http,store) {

            let loginService = {};
            loginService.login = function (email, password) {
                return $http.post((store.get('apiPath')+ 'login'), {
                    email: email,
                    password: password
                })
                    .then((response) => {
                        return response;
                    })
                    .catch((err) => {
                        return err;
                    });
            };
            return loginService;
        }
    ]);