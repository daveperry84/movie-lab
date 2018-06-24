angular.module('movieApp')
    .service('WatchlistService', ['$q', function ($q) {
    var _priv = {
        getWatchlist: function() {
            var defer = $q.defer();
            defer.resolve(localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : []);
            
            return defer.promise;
        },
        toggleWatchlist: function(id) {
            var defer = $q.defer();
            
            var watchlist = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [];
            var index = watchlist.indexOf(id);

            if(index > -1) {
                watchlist.splice(index, 1);
            } else {
                watchlist.push(id);
            }

            localStorage.setItem('watchlist', JSON.stringify(watchlist));

            defer.resolve(watchlist);
            
            return defer.promise;
        }
    }
    
    return {
        getWatchlist: function() {
            return _priv.getWatchlist();
        },
        toggleWatchlist: function(id) {
            return _priv.toggleWatchlist(id);
        }
    }
}]);
