/**
 * Created by hjzheng on 17/2/7.
 */


(function() {

	angular.module('ui-pagination', []);
	angular.module('ui-pagination').directive('myPagination', function() {

		return {
			restrict: 'E',
			templateUrl: './pagination.tpl.html',
			controller: function() {
				// var vm = this;
			},
			bindToController: true,
			controllerAs: 'vm'
		};
	});
}());
