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

				vm.open = function() {
					vm.dropdownEle.addClass(myDropdownToggleClass);
					$document.bind('click', dropdownClose);
				};

				vm.close = function() {
					vm.dropdownEle.removeClass(myDropdownToggleClass);
					$document.unbind('click', dropdownClose);
				};

				vm.toggle = function(event) {
					if (vm.dropdownEle.hasClass(myDropdownToggleClass)) {
						vm.close();
					} else {
						vm.open();
					}
					event.stopPropagation();
				};

				function dropdownClose(event) {
					if (!$element[0].contains(event.target)) {
						vm.close();
					}
				}
			},
			controllerAs: 'dropdownCtrl'
		};
	});
}());
