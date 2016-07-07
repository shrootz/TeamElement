'use strict';

function SearchBarController($scope, $http) {
	var customerAmtArray = [];
	$scope.finalArr = [[]];
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
					var total_spent = 0;
					var food = 0;
					var clothes = 0;
					var other = 0;
					var merchant_id = 0;
					for (var i = 0; i<response.data.length; i++){
						total_spent = total_spent +response.data[i].amount;
						merchant_id = response.data[i].payee_id;
					}
					customerAmtArray.push(total_spent);

					var sortedArr = _.sortBy(customerAmtArray, function(num) { return parseInt(num); });

					var groupedArr = _.groupBy(sortedArr, function(num) {
						var group = 0;
						var amt = parseInt(num);
						if(amt > 0 && amt < 5000) { group = 1; }
						if(amt >= 5000 && amt < 10000) { group = 2; }
						else if(amt >= 10000 && amt <= 15000) { group = 3; }
						else if(amt > 15000 && amt <= 20000) {group = 4;}
						else if(amt > 20000 && amt <= 25000) {group = 5;}
						else if(amt > 25000 && amt <= 30000) {group = 6;}
						else if(amt > 30000 && amt <= 35000) {group = 7;}
						else if(amt > 35000) {group = 8;}
						return group;
					});

					var finalArr = _.map(groupedArr, function(arr) {
						return arr.length;
					});

					$scope.finalArr = [finalArr];

					console.log($scope.finalArr);

			  	}, function errorCallback(response) {

			  	});
			}
	  	}, function errorCallback(response) {

	  	});
	};

	$scope.go = function() {
		console.log("hello");
	}
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
