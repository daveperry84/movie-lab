movieApp.directive('watchlistModal', function() {
    return {
        templateUrl: 'javascripts/directives/watchlist/watchlist-modal-directive.html',
        restrict: 'E',
        scope: {
            movie: '='
        },
        controller: function($scope) {
            $scope.chooseRandomMovie = function() {
                $scope.$emit('chooseRandomMovie', {});
            }
        }
    };
});
