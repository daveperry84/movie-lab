movieApp.directive('movieDetail', function() {
    return {
        templateUrl: 'javascripts/directives/movie/movie-detail-directive.html',
        restrict: 'E',
        scope: {
            movie: '='
        },
        controller: function($scope) {
            
        }
    };
});
