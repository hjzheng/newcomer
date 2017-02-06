/**
 * Created by hjzheng on 6/2/17.
 */
(function() {

	angular.module('ui-loading', []);
	angular.module('ui-loading').directive('myLoading', function() {

		return {
			scope: {
				size: '@'
			},
			restrict: 'E',
			templateUrl: './loading.tpl.html',
			controller: function() {
				var vm = this;
				vm.size = vm.size || 'normal';
			},
			bindToController: true,
			controllerAs: 'vm',
			transclude: true
		};
	});
}());
