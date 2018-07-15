class AuthService {

    constructor(store, jwtHelper) {
        this.jwtHelper = jwtHelper;
        this.store = store;
    }
    tokenPayload() {
        return (jwtHelper.decodeToken(store.get('jwt')));
    };
    getToken() {
        return (store.get('jwt'));
    };
    getHeaders() {
        return {
            'Authorization': ('Bearer ' + store.get('jwt'))
        };
    };
    setToken(token) {
        store.set('jwt', token);
    };

}
export default ['store', 'jwtHelper', AuthService];