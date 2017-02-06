/**
 * Created by hjzheng on 16/6/16.
 */
(function() {

	angular.module('dropdown-ui').directive('myDropdownDate', function() {

		// function formatDate() {
		// }

		return {
			scope: {
				onSelect: '&',
				ngModel: '='
			},
			restrict: 'E',
			require: 'ngModel',
			templateUrl: './dropdown-date.tpl.html',
			controller: function($scope) {
				var vm = this;
				$scope.$watch('vm.ngModel', function(newValue) {
					vm.dateValue = newValue || (new Date()).toJSON().split('T')[0];
				});
			},
			bindToController: true,
			controllerAs: 'vm',
			link: function(scope, element, attrs, ngModelCtrl) {
				scope.vm.onSelected = function(date) {
					scope.vm.dateValue = date;
					ngModelCtrl.$setViewValue(date);
				};
			}
		};
	});
}());
