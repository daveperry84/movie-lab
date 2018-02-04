movieApp.controller("movieDetailsController", ['$scope', '$routeParams', 'MovieService', function ($scope, $routeParams, MovieService) {
    MovieService.getMovieById($routeParams.imdbId).then(function(data) {
        $scope.currMovie = data;
    });
}]);
