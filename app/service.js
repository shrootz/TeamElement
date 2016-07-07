angular.module('myApp', []);
myModule.factory('serviceId', function() {
  var shinyNewServiceInstance;  
	$http({
	  method: 'GET',
	  url: 'http://api.reimaginebanking.com/accounts?type=Credit%20Card&key=8c5bbb4e9fc2ff7fe35aa72ca63739e3'
	}).then(function successCallback(response) {
		
  	}, function errorCallback(response) {

  	});
  return shinyNewServiceInstance;
});