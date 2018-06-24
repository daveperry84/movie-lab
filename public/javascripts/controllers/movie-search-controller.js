movieApp.controller('movieSearchController', ['$scope', '$http', 'MovieService', 'WatchlistService', function($scope, $http, MovieService, WatchlistService) {
    $scope.movies = [];
    $scope.searchParams = {};
    $scope.results = {
	noOfResults: 0,
	zeroResults: false,
	firstItemNo: null,
	lastItemNo: null,
	currentPage: null,
	lastPage: null
    }
	
    var initialise = function() {
		WatchlistService.getWatchlist().then(function(watchlist) {
			$scope.watchlist = watchlist;

			if(sessionStorage.getItem('searchParams')) {
				$scope.searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
				searchMovies();
			} 
		})
    }
	
	var searchMovies = function(event) {
		MovieService.searchMovies($scope.searchParams).then(function(data) {
			$scope.movies = !!data.Search ? data.Search : [];

			if($scope.movies.length > 0) {
				$scope.results.zeroResults = false;
				$scope.results.noOfResults = data.totalResults;
				$scope.results.lastPage = Math.ceil($scope.results.noOfResults/10);
				$scope.results.currentPage = $scope.searchParams.currentPage;
				getItemNumbers($scope.results.currentPage, $scope.results.noOfResults);

				$scope.movies.forEach(function(movie) {
					movie.onWatchlist = $scope.watchlist.indexOf(movie.imdbID) > -1;
				})
			} else {
				$scope.results.zeroResults = true;
			}
		});
	};

	var getItemNumbers = function(page, totalResults) {
		$scope.results.firstItemNo = ((page - 1) * 10) + 1;
		var lastItem = page * 10;

		if(totalResults < lastItem || totalResults === lastItem) {
			$scope.results.lastItemNo = totalResults;
		} else {
			$scope.results.lastItemNo = lastItem;
		}
	}

	var changePage = function(event, page) {
		$scope.searchParams.currentPage += page.direction;
                
		MovieService.searchMovies($scope.searchParams).then(function(data) {
			$scope.movies = data.Search;
			$scope.results.currentPage = $scope.searchParams.currentPage;
			getItemNumbers($scope.results.currentPage, $scope.results.noOfResults);
		});
	}

	$scope.$on('searchMovies', searchMovies);
	$scope.$on('changePage', changePage);
	
	initialise();
}]);
