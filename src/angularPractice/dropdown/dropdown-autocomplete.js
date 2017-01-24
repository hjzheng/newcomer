/**
 * Created by hjzheng on 16/6/16.
 */
(function() {

	angular.module('dropdown-ui').directive('myDropdownAutocomplete', function() {

		function searchOptionByLabel(options, keyword) {
			if (keyword && keyword !== '') {
				options = angular.copy(options);
				return options.filter(function(option) {
					return option.label.indexOf(keyword) !== -1;
				}).map(function(option) {
					option.label = option.label.replace(keyword, '<b>' + keyword + '</b>');
					return option;
				});
			} else {
				return [];
			}
		}

		function removeHighlight(label) {
			if (angular.isString(label)) {
				return label.replace('<b>', '').replace('</b>', '');
			} else {
				return label;
			}
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
			templateUrl: './dropdown-autocomplete.tpl.html',
			controller: function($scope) {
				var vm = this;
				vm.toggle = function(open) {
					if (open === true) {
						vm.dataList = searchOptionByLabel(vm.options, vm.label);
					}
				};

				$scope.$watch('vm.selectLabel', function(newValue) {
					vm.dataList = searchOptionByLabel(vm.options, newValue);
					vm.ngModel = removeHighlight(newValue);
				});

			},
			bindToController: true,
			controllerAs: 'vm',
			link: function(scope, element, attrs, ngModelCtrl) {
				scope.vm.selectOption = function(option) {
					ngModelCtrl.$setViewValue(option.value);
					ngModelCtrl.$render();
					scope.vm.selectLabel = removeHighlight(option.label);
					scope.vm.onSelect && scope.vm.onSelect({option: option});
				};
			}
		};
	});
}());
