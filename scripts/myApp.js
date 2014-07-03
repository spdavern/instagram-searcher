angular.module('myApp', ["ngAnimate"])
	.constant('VERSION', "1.0")
	.run(function(VERSION, $rootScope) {
		$rootScope.version = VERSION;
	})
	.controller('instagramSearchCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.formData = {submitted: false, haveResults: false, fadeResults: false,
						   message: ""};
		$scope.imageData = {data: []};
		$scope.submit = function() {
			$scope.fadeResults = true;
			if($scope.myForm.$valid) {
				//Clear the text field and report that instagram is being queried.
				$scope.formData.searchingFor = $scope.formData.tag.trim();
				$scope.formData.tag = "";
				$scope.message = "Searching Instagram for photos tagged with " +
									$scope.formData.searchingFor + "."
				$scope.formData.submitted = true;
				//query the instagram API for the tag.
				$scope.getImages($scope.formData.searchingFor);
			};
		};
	    $scope.getImages = function(tagRequest) {
	    	var CLIENT_ID = "d8d33d939d66419c8bd2669014e7ef78"
	        var url = "https://api.instagram.com/v1/tags/" + tagRequest + "/media/recent"
	        var request = {
	        	callback: 'JSON_CALLBACK',
	        	client_id: CLIENT_ID
	        };
	        $http({
	            method: 'JSONP',  //This JSONP method tells Angular to use JSONP for the GET.
	            url: url,
	            params: request
	        }).success(function(results) {
	        	if (results.meta.code == 200) {
	        		if (results.data.length > 0) {
	        			$scope.haveResults = true;
	        			$scope.fadeResults = false;
	        			$scope.images = results.data
	        			$scope.message = 'We found ' + results.data.length +
	        							 ' results for "' + $scope.formData.searchingFor + '"'
	        		} else {
	        			$scope.message = 'No images were found for the tag "' + 
	        								$scope.formData.searchingFor + '".'
	        			$scope.fadeResults = true
	        		}
	        	} else {
	        		$scope.message = 'Searched for "' + $scope.formData.searchingFor 
	        							+ '".  ' + results.meta.error_message;
	        		$scope.fadeResults = true;
	        	}
	        }).error(function() {
	            alert('The Instagram search for "' + tagRequest + 
	            	  '" was not successful.  Only one tag, please. (no spaces)');
	            $scope.message = "";
	            $scope.fadeResults = true;
	        })
	    };
	}]);