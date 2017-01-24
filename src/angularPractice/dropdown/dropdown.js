/**
 * Created by hjzheng on 16/6/16.
 */
(function() {

	angular.module('dropdown-ui', []);

	angular.module('dropdown-ui').constant('myDropdownConfig', {
		toggleClass: 'dropdown-menu-show',
		toggleEvent: 'click'
	});

	angular.module('dropdown-ui').directive('myDropdownToggle', function(myDropdownConfig) {
		return {
			restrict: 'A',
			require: '^^myDropdown',
			link: function(scope, iElement, iAttrs, dropdownCtrl) {
				iElement.bind(myDropdownConfig.toggleEvent, function(event) {
					dropdownCtrl.toggle(event);
				});
			}
		};
	});

	angular.module('dropdown-ui').directive('myDropdownMenu', function() {
		return {
			restrict: 'A',
			require: '^^myDropdown',
			link: function(scope, iElement, iAttrs, dropdownCtrl) {
				dropdownCtrl.setDropdownMenu(iElement);
			}
		};
	});

	angular.module('dropdown-ui').directive('myDropdown', function($document, myDropdownConfig, $parse) {
		return {
			restrict: 'A',
			controller: function($scope, $element, $attrs) {

				var vm = this;

				vm.setDropdownMenu = function(ele) {
					vm.dropdownEle = ele;
				};

				vm.open = function() {
					if (!$attrs.disabled) {
						vm.dropdownEle.addClass(myDropdownConfig.toggleClass);
						$document.bind('click', dropdownClose);
						$attrs.onToggle ? $parse($attrs.onToggle)($scope, {open: true}) : angular.noop;
					}
				};

				vm.close = function() {
					vm.dropdownEle.removeClass(myDropdownConfig.toggleClass);
					$document.unbind('click', dropdownClose);
					$attrs.onToggle ? $parse($attrs.onToggle)($scope, {open: false}) : angular.noop;
				};

				vm.toggle = function(event) {
					if (vm.dropdownEle.hasClass(myDropdownConfig.toggleClass)) {
						vm.close();
					} else {
						vm.open();
					}
					event.stopPropagation();
				};

				function dropdownClose(event) {
					if ($attrs.autoClose === 'true' || !$element[0].contains(event.target)) {
						vm.close();
					}
				}
			},
			controllerAs: 'dropdownCtrl'
		};
	});
}());
