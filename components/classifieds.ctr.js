// iifi immediate invoked function i....
(function(){
	"use strict";

	angular
		.module("ngClassifieds") // using module - no brackets
		.controller("classifiedsCtrl",function($scope){
			$scope.name = {
				first:"Zbyszko",
				last:"zbogdanca"
			};
			
			$scope.message = "siemka";

		});

})();