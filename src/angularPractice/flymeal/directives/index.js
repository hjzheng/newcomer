(function () {
	angular.module('app.directive', []);
	angular.module('app.directive').directive('myRank', function(){
		return {
			restrict: 'E',
			scope: {
				rank: '@'
			},
			templateUrl: './directives/myRank.html',
			controller: function($scope){
				var num = new Number($scope.rank);
				var stars = []
				for(var i=0; i<num; i++){
					stars.push(true)
				}
				for(var i=0; i<(5 - num); i++){
					stars.push(false)
				}
				$scope.stars = stars;
			}
		}
	});

	angular.module('app.directive').directive('myRestaurantCard', function () {
		return {
			restrict: 'E',
			scope: {
				restaurant: '='
			},
			templateUrl: './directives/myRestaurantCard.html'
		}
	});

	angular.module('app.directive').directive('myPaging', function () {
		return {
			restrict: 'E',
			/*
			* options = {currentPage: 1, pageSize: 10,  totalItems: 201}
			* */
			scope: {
				options: '=',
				onChange: '&',
			},
			templateUrl: './directives/myPaging.html',
			controller: function ($scope, $element, $attrs) {

				$scope.options.pageSize = $scope.options.pageSize || 10;

				$scope.pageSizes = [5, 10, 15, 20];

				function getTotalPages() {
					return Math.ceil($scope.options.totalItems / $scope.options.pageSize);
				}

				$scope.totalPages = getTotalPages();

				$scope.firstPage = function() {
					$scope.options.currentPage = $scope.jumpToPageNum = 1;
				};

				$scope.prevPage = function() {
					$scope.options.currentPage = $scope.jumpToPageNum =
						parseInt($scope.options.currentPage) <= 1 ? 1 : parseInt($scope.options.currentPage) - 1;
				};

				$scope.nextPage = function() {
					$scope.options.currentPage = $scope.jumpToPageNum =
						$scope.options.currentPage < $scope.totalPages ? parseInt($scope.options.currentPage) + 1 : $scope.totalPages;
				};

				$scope.lastPage = function() {
					$scope.options.currentPage = $scope.jumpToPageNum = $scope.totalPages;
				};

				$scope.$watchCollection($attrs.options, function(newValue, oldValue){
					if (newValue.pageSize !== oldValue.pageSize) {
						//当 pageSize 数据变化, 更新新总页数
						$scope.totalPages = getTotalPages();
					
						if(newValue.currentPage !== 1){
							newValue.currentPage = 1;
						} else {
							$scope.onChange({pageSetting: newValue});
						}
					} else {
						$scope.onChange({pageSetting: newValue});
					}
				});

				$scope.jumpToPageNum = 1;

				$scope.jumpTo = function () {
					if (!/^[0-9]*[1-9][0-9]*$/.test($scope.jumpToPageNum) || $scope.jumpToPageNum > $scope.totalPages) {
						$scope.jumpToPageNum = $scope.options.currentPage;
					} else {
						$scope.options.currentPage = Number($scope.jumpToPageNum);
					}
				};
			}
		}
	})
})();