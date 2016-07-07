'use strict';

function SearchBarController($scope, $http, $q) {
	var customerAmtArray = [];
	$scope.finalArr = [[]];
	$scope.display = false;
	var myScope = $scope;

	$scope.onclick = function() {
		console.log("first req");
		$http({
		  method: 'GET',
		  url: 'http://api.reimaginebanking.com/accounts?type=Credit%20Card&key=8c5bbb4e9fc2ff7fe35aa72ca63739e3'
		}).then(function successCallBack(response) {
			console.log("second req");
			var promises = [];
			// console.log(response.data[0]);
			for(var k = 0; k < response.data.length; k += 1) {
				// console.log("for num " + k);
				var tmpUrl = 'http://api.reimaginebanking.com/accounts/' + response.data[k]._id + '/purchases?key=8c5bbb4e9fc2ff7fe35aa72ca63739e3';
				promises.push($http.get(tmpUrl).then(function(response) {
					return response.data;
				}));
			}

			return $q.all(promises)
			.then(function successCallBack(response) {
				// console.log(response);
				for(var k = 0; k < response.length; k += 1) {
					var total_spent = 0;
					
					for(var j = 0; j < response[k].length; j += 1) {
						total_spent = total_spent + parseInt(response[k][j].amount);
					}

					customerAmtArray.push(total_spent);
				}

				console.log(customerAmtArray);

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

				myScope.pieData = finalArr;
				myScope.finalArr = [finalArr];


				console.log("this is the data: " + finalArr);

				return finalArr;
			})
		})
			.then(function(response) {
				console.log("almost done!");
				console.log(response);
				console.log(myScope.finalArr);
				myScope.display = true;
				return response;
			})
	}

	$scope.go = function() {
		console.log("hello");
	}
		$scope.data = [[65, 59, 80, 81, 56, 55, 40]];
	$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','lan'];
	$scope.series = ["something"];
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
