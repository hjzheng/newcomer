/**
 * Created by hjzheng on 16/6/16.
 */
(function() {
	angular.module('app', []);

	angular.module('app').controller('MainController', function($scope) {
		$scope.toggle = function(open) {
			console.log('open:', open);
		};
	});

	angular.module('app').directive('myPanel', myPanel);

	myPanel.$inject = ['$timeout'];

	function myPanel($timeout) {
		return {
			restrict: 'E',
			scope: {
				title: '@panelTitle',
				isOpened: '@',
				onToggle: '&'
			},
			templateUrl: './panel.tpl.html',
			controller: function() {
				var vm = this;
				if (angular.isDefined(vm.isOpened)) {
					vm.isOpened = (vm.isOpened === 'true');
				} else {
					vm.isOpened = true;
				}

				vm.toggle = function() {
					var handlePromise = $timeout(function() {
						vm.isOpened = !vm.isOpened;
						vm.disabled = true;
					});

					handlePromise.then(function() {
						vm.disabled = false;
					});

					vm.onToggle ? vm.onToggle({isOpened: vm.isOpened}) : angular.noop();
				};
			},
			replace: true,
			controllerAs: 'vm',
			bindToController: true,
			transclude: true
		};
	}

}());
