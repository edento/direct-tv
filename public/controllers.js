directTV.controller('mainController', ['$scope', '$state', '$http', 'validator', function($scope, $state, $http, validator) {

    $scope.currentTab = {
        about: false,
        spec: false,
        pricing: false,
        support: false,
        contact: false
    };

    $scope.formData = {
        name: '',
        email: '',
        message: ''
    };

    var isValid = {
        name: false,
        email: false,
        message: false
    };

    var error = {
        BAD_EMAIL: 'אנא מלא כתובת מייל תקינה על מנת שנוכל לחזור אלייך',
        BAD_FORM: 'אנא בדוק תקינות הטופס'
    };


    var initView = function() {
        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                event.preventDefault();
                console.log("current state is ", $state.current.name);
                $scope.currentTab[$state.current.name] = true;
            });
    }


    $scope.changeView = function(viewName) {
        console.log("change view to " + viewName)

        for (var property in $scope.currentTab) {
            if ($scope.currentTab.hasOwnProperty(property)) {
                $scope.currentTab[property] = false;
            }
        }
        $scope.currentTab[viewName] = true;
    };

    $scope.submitForm = function() {
        console.log("submitting... need to do some validation", $scope.formData);
        isValid = {
            name: validator.isFilled($scope.formData.name),
            email: validator.isEmailValid($scope.formData.email),
            message: validator.isFilled($scope.formData.message)
        }
        console.log("Validation: ", isValid);
        if (isValid.name && isValid.email && isValid.message) {
            // if form valid, make request
            $http({
                url: "https://formspree.io/sales@dtv.org.il",
                data: $.param({
                    email: $scope.formData.email,
                    name: $scope.formData.name,
                    message: $scope.formData.message
                }),
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(
                function success(response) {
                    console.log("response", response);
                    alert("תודה שפנית אלינו, ניצור איתך קשר בהקדם");
                    $scope.formData = {
                        name: '',
                        email: '',
                        message: ''
                    }

                },
                function error(response) {
                    console.log("response", response);
                    alert(error.BAD_FORM);
                }
            );
        } else {
            if (!isValid.email && isValid.name && isValid.message) {
                alert(error.BAD_EMAIL);
            } else {
                alert(error.BAD_FORM);
            }
        }

    }
    initView();



}]);