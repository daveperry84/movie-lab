angular.module('movieApp')
    .service('MovieService', ['$http', '$q', function ($http, $q) {
    var _priv = {
        apiKey: 'd005bb7a',
        getMovieById: function(id) {
            var defer = $q.defer();            
            var url = 'https://www.omdbapi.com/?i=' + id + '&apikey=' + _priv.apiKey;

            $http.get(url).then(function(data) {
                defer.resolve(data.data);
            });
            
            return defer.promise;
        }
    }
    
    return {
        getMovieById: function(id) {
            return _priv.getMovieById(id);
        }
    }
}]);
