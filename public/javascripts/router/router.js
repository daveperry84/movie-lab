movieApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tmpl/home.html',
            controller: 'movieSearchController'
        }).when('/movie/:imdbId', {
            templateUrl: 'tmpl/movie.html',
            controller: 'movieDetailsController'
        }).when('/watchlist', {
            templateUrl: 'tmpl/watchlist.html',
            controller: 'movieWatchlistController'
        }).otherwise({
            redirectTo: '/'
        });
});
