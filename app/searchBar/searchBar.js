'use strict';

function SearchBarController() {

}

angular.module('myApp').component('search', {
    restrict: 'E',
    scope: false,
    replace: true,
    templateUrl: 'searchBar/searchBar.html',
    controller: SearchBarController,
	bindings: {
	hero: '='
	}
});