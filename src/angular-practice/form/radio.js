/**
 * Created by hjzheng on 16/6/16.
 */
(function() {

	angular.module('ui-radio', []);

	angular.module('ui-radio').directive('myRadio', function() {

		return {
			scope: {
				ngValue: '@',
				disabled: '=',
				ngModel: '='
			},
			restrict: 'E',
			require: 'ngModel',
			replace: true,
			templateUrl: './radio.tpl.html',
			controller: function($scope, $element) {
				var vm = this;
				vm.ngValue = angular.isDefined(vm.ngValue) ? vm.ngValue : true;

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

					if (value !== scope.vm.ngValue) {
						scope.vm.ngModel = scope.vm.ngValue;
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
