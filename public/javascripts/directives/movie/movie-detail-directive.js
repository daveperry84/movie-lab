movieApp.directive('movieDetail', function() {
    return {
        templateUrl: 'javascripts/directives/movie/movie-detail-directive.html',
        restrict: 'E',
        scope: {
            movie: '='
        },
        controller: function($scope, WatchlistService) {
            $scope.back = function () {
		        window.history.back();
            };

            $scope.toggleWatchlist = function() {
                WatchlistService.toggleWatchlist($scope.movie.imdbID).then(function() {
                    $scope.movie.onWatchlist = !$scope.movie.onWatchlist;
                })
            }
        }
    };
});
