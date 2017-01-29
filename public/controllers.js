directTV.controller('mainController', ['$scope', '$state', '$http', function($scope, $state, $http) {

    $scope.currentTab = {
        about: false,
        pricing: false,
        support: false,
        contact: false
    };

    $scope.formData = {
        name: '',
        email: '',
        message: ''
    }

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
        $http({
            url: "https://formspree.io/edentoledano@gmail.com",
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
                alert("אנא בדוק תקינות הטופס")
            }
        );
    }
    initView();



}]);