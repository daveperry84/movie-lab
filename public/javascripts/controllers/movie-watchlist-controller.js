movieApp.controller("movieWatchlistController", ['$scope', '$routeParams', 'WatchlistService', 'MovieService', function ($scope, $routeParams, WatchlistService, MovieService) {
    WatchlistService.getWatchlist().then(function(watchlist) {
        var watchlistTemp = [];

        watchlist.forEach(function(item) {
            MovieService.getMovieById(item).then(function(data) {
                watchlistTemp.push(data);
            });
        })

        watchlistTemp.sort(function(a, b){
            if(a.Title < b.Title) return -1;
            if(a.Title > b.Title) return 1;
            return 0;
        })

        $scope.watchlist = watchlistTemp;

        var chooseRandomThenOpenModal = function() {
            chooseRandomMovie();
            $('#randomMovieModal').modal('show');
        }

        $scope.$on('chooseRandomThenOpenModal', chooseRandomThenOpenModal);

        var chooseRandomMovie = function() {
            if($scope.watchlist.length > 0) {
                var randomIndex = Math.floor(Math.random() * $scope.watchlist.length);

                $scope.randomMovie = $scope.watchlist[randomIndex];
            }
        }

        $scope.$on('chooseRandomMovie', chooseRandomMovie);
    })
}]);
