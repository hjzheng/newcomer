/**
 * Created by hjzheng on 16/6/16.
 */
(function() {
	angular.module('app', []);

	angular.module('app').controller('MainController', function($scope) {
		$scope.toggle = function(open) {
			console.log('open:', open);
		};

		$scope.orderLabel = '排序';
		$scope.orderIcon = '';
		$scope.orderSortList = [
			{label: '价格 由低到高', sort: 'price', dir: 'asc'},
			{label: '价格 由高到低', sort: 'price', dir: 'desc'},
			{label: '服务 由低到高', sort: 'serve', dir: 'asc'},
			{label: '服务 由高到低', sort: 'serve', dir: 'desc'}
		];
		$scope.orderClick = function(order, $index) {
			$scope.orderLabel = order.label.split(' ')[0];
			$scope.orderIcon = order.dir;
			$scope.selectedIndex = $index;
		};
	});

	angular.module('app').constant('myDropdownConfig', {
		toggleClass: 'dropdown-menu-show',
		toggleEvent: 'click'
	});

	angular.module('app').directive('myDropdownToggle', function(myDropdownConfig) {
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

	angular.module('app').directive('myDropdownMenu', function() {
		return {
			restrict: 'A',
			require: '^^myDropdown',
			link: function(scope, iElement, iAttrs, dropdownCtrl) {
				dropdownCtrl.setDropdownMenu(iElement);
			}
		};
	});

	angular.module('app').directive('myDropdown', function($document, myDropdownConfig, $parse) {
		return {
			restrict: 'A',
			controller: function($scope, $element, $attrs) {

				var vm = this;

				vm.setDropdownMenu = function(ele) {
					vm.dropdownEle = ele;
				};

				vm.open = function() {
					vm.dropdownEle.addClass(myDropdownConfig.toggleClass);
					$document.bind('click', dropdownClose);
					$attrs.onToggle ? $parse($attrs.onToggle)($scope, {open: true}) : angular.noop;
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
