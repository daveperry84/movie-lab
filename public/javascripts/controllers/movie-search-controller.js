movieApp.controller('movieSearchController', ['$scope', '$http', 'MovieService', function($scope, $http, MovieService) {
    $scope.movies = [];
    $scope.currMovie = null;
    $scope.lastPage = null;
    $scope.searchParams = {};
    $scope.noOfResults = 0;
    $scope.firstItemNo = null;
    $scope.lastItemNo = null;
    $scope.zeroResults = false;
    $scope.titleInvalid = false;
    $scope.yearInvalid = false;
    $scope.invalidYearText = "Invalid input";
	
    if(sessionStorage.getItem('searchParams')) {
        $scope.searchParams = JSON.parse(sessionStorage.getItem('searchParams')); 
	$scope.validateFormAndSearch();
    }    

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
            searchMovies();
        }
    }
	
	var searchMovies = function() {		
		MovieService.searchMovies($scope.searchParams).then(function(data) {
			if(!!data.Search) {
				$scope.movies = data.Search;
			}

			if($scope.movies.length > 0) {
				$scope.zeroResults = false;
				$scope.noOfResults = data.totalResults;
				$scope.lastPage = Math.ceil($scope.noOfResults/10);
				getItemNumbers($scope.searchParams.currentPage, $scope.noOfResults);
			} else {
				$scope.zeroResults = true;
			}
		});
	};
	
	$scope.nextPage = function() {
		$scope.searchParams.currentPage += 1;
		
		MovieService.searchMovies($scope.searchParams).then(function(data) {
			$scope.movies = data.Search;
			getItemNumbers($scope.searchParams.currentPage, $scope.noOfResults);
		});
	};
	
	$scope.prevPage = function() {
		$scope.searchParams.currentPage -= 1;
		
		MovieService.searchMovies($scope.searchParams).then(function(data) {
			$scope.movies = data.Search;
			getItemNumbers($scope.searchParams.currentPage, $scope.noOfResults);
		});
	};

	var getItemNumbers = function(page, totalResults) {
		$scope.firstItemNo = ((page - 1) * 10) + 1;
		var lastItem = page * 10;

		if(totalResults < lastItem || totalResults === lastItem) {
			$scope.lastItemNo = totalResults;
		} else {
			$scope.lastItemNo = lastItem;
		}
	}
}]);
