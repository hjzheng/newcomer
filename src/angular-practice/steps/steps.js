/**
 * Created by hjzheng
 */
(function() {

	angular.module('ui-steps', []);
	angular.module('ui-steps').directive('mySteps', function() {

		return {
			scope: {
				steps: '='
			},
			restrict: 'E',
			templateUrl: './steps.tpl.html',
			controller: function($scope, $element) {
				// var vm = this;
			},
			bindToController: true,
			controllerAs: 'vm'
		};
	});
}());
