movieApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tmpl/home.html',
            controller: 'javascripts/movie-controller.js'
        }).when('/movie/:imdbId', {
            templateUrl: 'tmpl/movie.html',
            controller: 'movieDetailsController'
        }).otherwise({
            redirectTo: '/'
        });
});
