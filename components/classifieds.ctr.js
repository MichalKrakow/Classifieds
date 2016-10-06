// iifi immediate invoked function i....
(function(){
	"use strict";

	angular
		.module("ngClassifieds") // using module - no brackets
		.controller("classifiedsCtrl",function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){

			classifiedsFactory.getClassifieds().then(function(classifieds){
				$scope.classifieds = classifieds.data;
				$scope.categories = getCategories(classifieds.data);
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

			$scope.deleteClassified = function(event, classified){
				var confirm = $mdDialog.confirm()
					.title('czy na pewno usunąć: ' + classified.title + '?')
					.ok('tak, usuń')
					.cancel('nie teraz')
					.targetEvent(event);

				$mdDialog.show(confirm).then(function(){
					var index = $scope.classifieds.indexOf(classified);
					$scope.classifieds.splice(index,1); // usun jeden i przesun
				},function(){ // then - else

				});
			}

			$scope.clearFilters = function(){
				$scope.category = '';
				$scope.classifiedsFilter = '';
			};

			function showToast(message){
				$mdToast.show( 
					$mdToast.simple()
						.content(message)
						.position('top, right')
						.hideDelay(3000)
				);
			}



			function getCategories(classifieds){
				var categories = [];
				angular.forEach(classifieds,function(classified){
					angular.forEach(classified.categories, function(category){
						if(categories.indexOf(category) < 0)
							categories.push(category);
					});
				});
				return categories;
			}

		});

})();