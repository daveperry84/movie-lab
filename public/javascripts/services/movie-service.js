movieApp.service('MovieService', function () {
    var _priv = {
        apiKey: '',
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

});
