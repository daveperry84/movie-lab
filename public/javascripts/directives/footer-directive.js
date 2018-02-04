movieApp.directive('footer', function() {
    return {
        templateUrl: 'javascripts/directives/footer-directive.html',
        restrict: 'A',
        scope: {},
        controller: function($scope) {
          $scope.linkedInUrl = "https://www.linkedin.com/in/dp-developer-320a6283/";
          $scope.name = 'Dave Perry'
        }
    };
});
