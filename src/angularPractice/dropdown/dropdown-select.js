/**
 * Created by hjzheng on 16/6/16.
 */
(function() {

	angular.module('dropdown-ui').directive('myDropdownSelect', function() {


		function getOptionLabelByValue(options, value) {
			var label = '';
			options.forEach(function(option) {
				if(option.value === value) {
					label = option.label;
				}
			});

			return label;
		}

		return {
			scope: {
				options: '<',
				disabled: '<',
				ngModel: '=',
				onSelect: '&'
			},
			restrict: 'E',
			require: 'ngModel',
			templateUrl: './dropdown-select.tpl.html',
			controller: function($scope) {
				var vm = this;
				vm.selectLabel = vm.ngModel ? getOptionLabelByValue(vm.options, vm.ngModel) : vm.options[0].label;
				$scope.$watch('vm.ngModel', function(newValue) {
					if(newValue) vm.selectLabel = getOptionLabelByValue(vm.options, newValue)
				});
			},
			bindToController: true,
			controllerAs: 'vm',
			link: function(scope, element, attrs, ngModelCtrl) {
				scope.vm.selectOption = function (option) {
					ngModelCtrl.$setViewValue(option.value);
					ngModelCtrl.$render();
					scope.vm.selectLabel = option.label;
					scope.vm.onSelect && scope.vm.onSelect({option: option});
				};
			}
		};
	});
}());
