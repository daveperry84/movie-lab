movieApp.controller("movieDetailsController", ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.getMovieById($routeParams.imdbId);
}]);
