class UserService {

    constructor($http, jwtHelper, store, authService) {

        this.$http = $http;
        this.jwtHelper = jwtHelper;
        this.store = store;

        this.authService = authService;
    }
    getUser() {
        return this.$http.get((this.store.get('apiPath') + 'user/' + this.authService.tokenPayload().id), {
                headers: authService.getHeaders()
            }).then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
    }
    update(user) {

        return this.$http.put((this.store.get('apiPath') + 'user/' + this.authService.tokenPayload().id), user, {
                headers: this.authService.getHeaders()
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
    }
    create(user) {
        return this.$http.post((this.store.get('apiPath') + 'user/'), user, {
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

}
export default ['$http', 'jwtHelper', 'store', 'authService', UserService];