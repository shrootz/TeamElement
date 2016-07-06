'use strict';

angular.module('myApp.searchBar', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/searchBar', {
    templateUrl: 'searchBar/searchBar.html',
    controller: 'searchBarCtrl'
  });
}])

.controller('searchBarCtrl', [function() {

}]);