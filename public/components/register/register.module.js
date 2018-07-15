import RegisterTemplate from "./register.template.html";
import RegisterController from "./register.controller";

export default angular.module('register', [])
    .component('register', {
        template: RegisterTemplate,
        controller: RegisterController,
        bindings: {
            text: '@'
        }
    })
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/register', {
            template: '<register text = "Salkic"></register>'
        });
    }]);