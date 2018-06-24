movieApp.controller("movieDetailsController", ['$scope', '$routeParams', 'MovieService', 'WatchlistService', function ($scope, $routeParams, MovieService, WatchlistService) {
    MovieService.getMovieById($routeParams.imdbId).then(function(data) {
        $scope.currMovie = data;

        WatchlistService.getWatchlist().then(function(watchlist) {
            $scope.currMovie.onWatchlist = watchlist.indexOf($scope.currMovie.imdbID) > -1;
        });
    });
}]);
