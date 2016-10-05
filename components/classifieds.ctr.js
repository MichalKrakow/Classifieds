// iifi immediate invoked function i....
(function(){
	"use strict";

	angular
		.module("ngClassifieds") // using module - no brackets
		.controller("classifiedsCtrl",function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast){
			
			classifiedsFactory.getClassifieds().then(function(classifieds){
				$scope.classifieds = classifieds.data; 
			});

			$scope.closeSidenav = function(){
				$mdSidenav('left').close();
			};

			$scope.openSidenav = function(){
				$mdSidenav('left').open();
			};

			$scope.saveClassified = function(classified){
				if(classified){
					$scope.classifieds.unshift(classified);
					$scope.classified = {};
					$scope.closeSidenav();
					showToast("classified saved");
				}
			};

			$scope.saveEdit = function(classified){
				$scope.isEdit = false;
				$scope.classified = {};
				showToast("classified edited");
				$scope.closeSidenav(); 
			};

			$scope.newClassified = function(){
				$scope.classified = {};
				$scope.isEdit = false;
				$scope.openSidenav();
			};

			$scope.editClassified = function(classified){
				$scope.isEdit = true;
				$scope.classified = classified;
				$scope.openSidenav();
			};

			function showToast(message){
				$mdToast.show( 
					$mdToast.simple()
						.content(message)
						.position('top, right')
						.hideDelay(3000)
				);
			}

		});

})();