movieApp.directive('searchBar', function() {
    return {
        templateUrl: 'javascripts/directives/search-bar-directive.html',
        restrict: 'E',
        scope: {
            searchParams: '='
        },
        controller: function($scope) {
            $scope.titleInvalid = false;
            $scope.yearInvalid = false;
            $scope.invalidYearText = "Invalid input";

            $scope.validateFormAndSearch = function() {
                $scope.titleInvalid = !$scope.searchParams.currentTitle || $scope.searchParams.currentTitle === null || $scope.searchParams.currentTitle === "";
        
                if(!isNaN(parseInt($scope.searchParams.currentYear))) {
                    var today = new Date();
                    var thisYear = today.getFullYear();
        
                    $scope.yearInvalid = parseInt($scope.searchParams.currentYear) < 1890 || parseInt($scope.searchParams.currentYear) > thisYear+1;
                    $scope.invalidYearText = "Must be in range 1890-" + thisYear;
                } else {
                    $scope.yearInvalid = $scope.searchParams.currentYear && $scope.searchParams.currentYear !== null && $scope.searchParams.currentYear !== "";;
                }
        
                if(!$scope.titleInvalid && !$scope.yearInvalid) {
                    $scope.searchParams.currentPage = 1;
                    $scope.$emit('searchMovies', {});
                }
            }
        }
    };
});
