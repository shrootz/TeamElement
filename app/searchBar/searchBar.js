'use strict';

function SearchBarController($scope,$http) {
  	$scope.onclick = function(){
	  	$http({
		  method: 'GET',
		  url: 'http://api.reimaginebanking.com/accounts?type=Credit%20Card&key=8c5bbb4e9fc2ff7fe35aa72ca63739e3'
		}).then(function successCallback(response) {
			for (var i = 0; i<response.data.length; i++){
				var id = response.data[i]._id;
				console.log(response.data[i]);
				var url = 'http://api.reimaginebanking.com/accounts/' + id + '/purchases?key=8c5bbb4e9fc2ff7fe35aa72ca63739e3';
				$http({
				  method: 'GET',
				  url: url
				}).then(function successCallback(response) {
					var id = 0;
					for (var i = 0; i<response.data.length; i++){
						id = id +response.data[i].amount;
					}
					console.log(id);
					console.log(response.data)
			  	}, function errorCallback(response) {

			  	});
			}
	  	}, function errorCallback(response) {

	  	});
	};
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
