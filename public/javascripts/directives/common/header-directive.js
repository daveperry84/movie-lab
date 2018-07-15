movieApp.directive('header', function() {
    return {
        templateUrl: 'javascripts/directives/common/header-directive.html',
        restrict: 'A',
        scope: {},
        controller: function($scope) {
          $scope.showMenu = false;

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

          $scope.toggleNavMenu = function(event) {
              if(event) {
                event.preventDefault();
              }  

              $scope.showMenu = !$scope.showMenu;
          }
        }
    };
});
