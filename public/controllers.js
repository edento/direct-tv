directTV.controller('mainController', ['$scope', '$state', function($scope, $state) {

    $scope.currentTab = {
        about: false,
        pricing: false,
        support: false,
        contact: false
    };

    var initView = function() {
        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                event.preventDefault();
                console.log("current state is ", $state.current.name);
                $scope.currentTab[$state.current.name] = true;
            });
    }

    initView();

    $scope.changeView = function(viewName) {
        console.log("change view to " + viewName)

        for (var property in $scope.currentTab) {
            if ($scope.currentTab.hasOwnProperty(property)) {
                $scope.currentTab[property] = false;
            }
        }
        $scope.currentTab[viewName] = true;
    };



}]);