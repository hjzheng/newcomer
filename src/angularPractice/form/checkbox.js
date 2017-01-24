/**
 * Created by hjzheng on 16/6/16.
 */
(function() {

	angular.module('ui-checkbox', []);
	angular.module('ui-checkbox').directive('myCheckbox', function() {

		return {
			scope: {
				trueValue: '@',
				falseValue: '@',
				disabled: '@',
				ngModel: '=',
				partial: '='
			},
			restrict: 'E',
			require: 'ngModel',
			templateUrl: './checkbox.tpl.html',
			controller: function($scope) {
				var vm = this;
				vm.trueValue = angular.isDefined(vm.trueValue) ? vm.trueValue : true;
				vm.falseValue = angular.isDefined(vm.falseValue) ? vm.falseValue : false;

				$scope.$watch('vm.partial', function(newValue) {
					if (newValue) {
						vm.ngModel = vm.falseValue;
					}
				});
			},
			bindToController: true,
			controllerAs: 'vm',
			link: function(scope, element, attrs, ngModelCtrl) {
				scope.vm.check = function(value, $event) {
					scope.vm.partial = false;
					if (value === scope.vm.trueValue) {
						scope.vm.ngModel = scope.vm.falseValue;
					} else {
						scope.vm.ngModel = scope.vm.trueValue;
					}

					ngModelCtrl.$setViewValue(scope.vm.ngModel);
					ngModelCtrl.$render();

					$event.stopPropagation();
				};
			},
			transclude: true
		};
	});
}());
