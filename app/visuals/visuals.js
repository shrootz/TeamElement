'use strict';

function VisualsController($scope) {
	
	$scope.data = [[65, 59, 80, 81, 56, 55, 40]];
	$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','lan'];
	$scope.series = ["something"];
}

angular.module('myApp').component('visuals', {
    restrict: 'E',
    //replace: true,
    templateUrl: 'visuals/visuals.html',
    controller: VisualsController,
    bindings: {
    	final: "@"
    }
});
