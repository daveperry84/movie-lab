movieApp.controller('movieController', ['$scope', '$http', 'MovieService', function($scope, $http, MovieService) {
    $scope.movies = [];
	$scope.currMovie = null;
	$scope.currentPage = 1;
	$scope.lastPage = null;
    $scope.currentTitle = '';
    $scope.currentYear = '';
    $scope.currentType = 'all';
    $scope.url = '';
    $scope.noOfResults = 0;
	$scope.firstItemNo = null;
	$scope.lastItemNo = null;
	$scope.zeroResults = false;
	$scope.titleInvalid = false;
	$scope.yearInvalid = false;
	$scope.invalidYearText = "Invalid input";
	
	var apiKey = "d005bb7a";

	$scope.getTodaysDate = function () {
        var today = new Date();
        var date = today.getDate().toString();

        var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var daySuffix = (date.substr(date.length-1,1) === "1") ? "st" :
            (date.substr(date.length-1,1) === "2") ? "nd" :
                (date.substr(date.length-1,1) === "3") ? "rd" : "th";

        return day[today.getDay()] + ' ' + date + daySuffix + ' ' + month[today.getMonth()] + ' ' + today.getFullYear().toString();
    };

    $scope.validateFormAndSearch = function() {
        $scope.titleInvalid = !$scope.currentTitle || $scope.currentTitle === null || $scope.currentTitle === "";

        if(!isNaN(parseInt($scope.currentYear))) {
            var today = new Date();
            var thisYear = today.getFullYear();

            $scope.yearInvalid = parseInt($scope.currentYear) < 1890 || parseInt($scope.currentYear) > thisYear+1;
            $scope.invalidYearText = "Must be in range 1890-" + thisYear;
        } else {
            $scope.yearInvalid = $scope.currentYear && $scope.currentYear !== null && $scope.currentYear !== "";;
        }

        if(!$scope.titleInvalid && !$scope.yearInvalid) {
            searchMovies();
        }
    }
	
	var searchMovies = function() {
		var yearParam = !!$scope.currentYear ? '&y=' + $scope.currentYear : '';
		var typeParam = !!$scope.currentType && $scope.currentType !== 'all' ? '&type=' + $scope.currentType : '';

		$scope.url = 'https://www.omdbapi.com/?s=' + $scope.currentTitle + yearParam + typeParam;
		$scope.urlWithKey = $scope.url + '&apikey=' + apiKey;
		$scope.currentPage = 1;
		
		$http.get($scope.urlWithKey).then(function(data) {
			if(!!data.data.Search) {
				$scope.movies = data.data.Search;
			}

			if($scope.movies.length > 0) {
				$scope.zeroResults = false;
				$scope.noOfResults = data.data.totalResults;
				$scope.lastPage = Math.ceil($scope.noOfResults/10);
				getItemNumbers($scope.currentPage, $scope.noOfResults);
			} else {
				$scope.zeroResults = true;
			}
		});
	};
	
	$scope.getMovieById = function(id) {
		MovieService.getMovieById(id).then(function(data) {
			$scope.currMovie = data;
		});
	};
	
	$scope.nextPage = function() {
		$scope.currentPage += 1;
		var url = $scope.url + '&page=' + $scope.currentPage.toString() + '&apikey=' + apiKey;
		
		$http.get(url).then(function(data) {
			$scope.movies = data.data.Search;
			getItemNumbers($scope.currentPage, $scope.noOfResults);
		});
	};
	
	$scope.prevPage = function() {
		$scope.currentPage -= 1;
		var url = $scope.url + '&page=' + $scope.currentPage.toString() + '&apikey=' + apiKey;
		
		$http.get(url).then(function(data) {
			$scope.movies = data.data.Search;
			getItemNumbers($scope.currentPage, $scope.noOfResults);
		});
	};
	
	$scope.back = function () {
		window.history.back();
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
