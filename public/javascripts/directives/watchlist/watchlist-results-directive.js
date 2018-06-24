movieApp.directive('watchlistResults', function() {
    return {
        templateUrl: 'javascripts/directives/watchlist/watchlist-results-directive.html',
        restrict: 'E',
        scope: {
            watchlist: '='
        },
        controller: function($scope) {
            $scope.chooseRandomThenOpenModal = function() {
                $scope.$emit('chooseRandomThenOpenModal', {});
            }
        }
    };
});
