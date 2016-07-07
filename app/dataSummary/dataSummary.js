'use strict';

function DataSummaryController() {

}

angular.module('myApp').component('summary', {
	restrict: 'E',
    scope: false,
    replace: true,
	templateUrl: 'dataSummary/dataSummary.html',
	controller: DataSummaryController
});