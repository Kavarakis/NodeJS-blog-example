class RegisterController {

    constructor($scope, $location, $timeout) {
        this.$scope = $scope;
        this.$location = $location;
        this.$timeout = $timeout;
    }
    submitForm(isValid) {
         // check to make sure the form is completely valid
         if (isValid) {
            this.userService.create(this.$scope.user)
                .then((result) => {
                    this.$scope.message = result.data.message;
                    if (result.status === 201) {
                        this.$timeout(function () {
                            this.$location.path('/');
                        }, 1500);
                    }
                });
        }
    }
    $onInit() {
        this.userService = userService
        $scope.message = false;
    }
}

export default ['$scope', '$location', '$timeout', 'userService', RegisterController];