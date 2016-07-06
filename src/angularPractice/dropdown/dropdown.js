/**
 * Created by hjzheng on 16/6/16.
 */
(function() {
	angular.module('app', []);

	angular.module('app').controller('MainController', function($scope) {

	});

	angular.module('app').constant('myDropdownToggleClass', 'dropdown-menu-show');
	angular.module('app').constant('myDropdownToggleEvent', 'click');

	angular.module('app').directive('myDropdownToggle', function(myDropdownToggleEvent) {
		return {
			restrict: 'A',
			require: '^^myDropdown',
			link: function(scope, iElement, iAttrs, dropdownCtrl) {
				iElement.bind(myDropdownToggleEvent, function(event) {
					dropdownCtrl.toggle(event);
				});
			}
		};
	});

	angular.module('app').directive('myDropdownMenu', function() {
		return {
			restrict: 'A',
			require: '^^myDropdown',
			link: function(scope, iElement, iAttrs, dropdownCtrl) {
				dropdownCtrl.setDropdownMenu(iElement);
			}
		};
	});

	angular.module('app').directive('myDropdown', function($document, myDropdownToggleClass, myDropdownToggleEvent) {
		return {
			restrict: 'A',
			controller: function($scope, $element, $attrs) {
				var vm = this;
				vm.setDropdownMenu = function(ele) {
					vm.dropdownEle = ele;
				};
				vm.toggle = function(event) {
					vm.dropdownEle.toggleClass(myDropdownToggleClass);
					event.stopPropagation();
				};

				$document.bind(myDropdownToggleEvent, function(event) {
					if (!$element[0].contains(event.target)) {
						vm.dropdownEle.removeClass(myDropdownToggleClass);
					}
				});
			},
			controllerAs: 'dropdownCtrl'
		};
	});
}());
