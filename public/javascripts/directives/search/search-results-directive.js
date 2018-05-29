movieApp.directive('searchResults', function() {
    return {
        templateUrl: 'javascripts/directives/search/search-results-directive.html',
        restrict: 'E',
        scope: {
            searchParams: '=',
            movies: '=',
            results: '='
        },
        controller: function($scope) {
            $scope.nextPage = function() {
                $scope.$emit('changePage', {direction:1});
            };
            
            $scope.prevPage = function() {
                $scope.$emit('changePage', {direction:-1});
            };
        }
    };
});
