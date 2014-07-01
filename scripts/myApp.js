angular.module('myApp', ["ngAnimate"])
	.constant('VERSION', "0.1")
	.run(function(VERSION, $rootScope) {
		$rootScope.version = VERSION;
	})
	.controller('instagramSearchCtrl', function($scope) {
		$scope.data = {submitted: false}
		$scope.submit = function() {
			if($scope.myForm.$valid) {
				$scope.data.submitted = true;
			};
		};
	});