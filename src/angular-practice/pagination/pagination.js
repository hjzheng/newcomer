/**
 * Created by hjzheng on 17/2/7.
 */


(function() {

	angular.module('ui-pagination', []);
	angular.module('ui-pagination').directive('myPagination', function() {

		return {
			restrict: 'E',
			scope: {
				totalItems: '@',
				pageSize: '=',
				onSelectPage: '&'
			},
			templateUrl: './pagination.tpl.html',
			controller: function($scope) {
				var vm = this;
				vm.currentPage = 1;

				var fn = vm.onSelectPage || angular.noop();
				var ti = parseInt(vm.totalItems, 10);
				var ps = parseInt(vm.pageSize, 10);

				$scope.$watch('vm.pageSize', function(newVal) {

					vm._currentPage = vm.currentPage = 1;

					ps = parseInt(newVal, 10);

					vm.maxPage = Math.floor(ti / ps + (ti % ps === 0 ? 0 : 1));

				});

				// TODO 添加 debounce
				vm.changePage = function() {
					if (isNaN(vm._currentPage) || vm._currentPage > vm.maxPage || vm._currentPage <= 0) {
						vm._currentPage = vm.currentPage;
					}
					vm.currentPage = parseInt(vm._currentPage, 10);
					vm.selectPage(vm.currentPage);
				};

				function pagingInfo(num, ps) {
					return {start: (num - 1) * ps + 1, end: (num - 1) * ps + ps};
				}

				vm.prePage = function() {
					if (vm.currentPage === 1) return;
					vm._currentPage = vm.currentPage = vm.currentPage - 1;
					fn(pagingInfo(vm.currentPage, ps));
				};

				vm.nextPage = function() {
					if (vm.currentPage === vm.maxPage) return;
					vm._currentPage = vm.currentPage = vm.currentPage + 1;
					fn(pagingInfo(vm.currentPage, ps));
				};

				vm.selectPage = function(num) {
					vm._currentPage = vm.currentPage = num;
					fn(pagingInfo(num, ps));
				};

			},
			bindToController: true,
			controllerAs: 'vm'
		};
	});
}());
