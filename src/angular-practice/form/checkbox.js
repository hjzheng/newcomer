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
				disabled: '=',
				ngModel: '=',
				partial: '='
			},
			restrict: 'E',
			require: 'ngModel',
			replace: true,
			templateUrl: './checkbox.tpl.html',
			controller: function($scope, $element) {
				var vm = this;
				vm.trueValue = angular.isDefined(vm.trueValue) ? vm.trueValue : true;
				vm.falseValue = angular.isDefined(vm.falseValue) ? vm.falseValue : false;

				$scope.$watch('vm.partial', function(newValue) {
					if (newValue) {
						vm.ngModel = vm.falseValue;
					}
				});

				$scope.$watch('vm.disabled', function(newValue) {
					if (newValue) {
						$element.attr('disabled', true);
					} else {
						$element.removeAttr('disabled');
					}
				});
			},
			bindToController: true,
			controllerAs: 'vm',
			link: function(scope, element, attrs, ngModelCtrl) {
				scope.vm.check = function(value, $event) {
					if (scope.vm.disabled) return;

					if (scope.vm.partial) {
						scope.vm.partial = false;
					}

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
