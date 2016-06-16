/**
 * Created by hjzheng on 16/6/8.
 */
(function() {
	angular.module('app', ['ngAnimate']);

	angular.module('app').controller('MyTooltipCtrl', function($scope) {

		$scope.show = false;

		$scope.showDetails = function() {
			$scope.show = true;
		};
		$scope.hideDetails = function() {
			$scope.show = false;
		};
	});
})();
