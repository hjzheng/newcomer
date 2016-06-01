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
	})
})();