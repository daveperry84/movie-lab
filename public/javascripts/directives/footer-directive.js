movieApp.directive('footer', function() {
    return {
        templateUrl: 'javascripts/directives/footer-directive.html',
        restrict: 'A',
        scope: {},
        controller: function($scope) {
          $scope.linkedInUrl = '';
          $scope.name = 'Dave Perry'
        }
    };
});
