movieApp.service('MovieService', ['$http', function ($http) {
    var _priv = {
        apiKey: 'd005bb7a',
        getMovieById: function(id) {
            var url = 'https://www.omdbapi.com/?i=' + id + '&apikey=' + _priv.apiKey;

            $http.get(url).then(function(data) {
                return data.data;
            });
        }
    }
    
    return {
        getMovieById: function(id) {
            return _priv.getMovieById(id);
        }
    }
}]);
