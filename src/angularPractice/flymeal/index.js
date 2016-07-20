/**
 * Created by hjzheng on 16/5/31.
 */
(function() {
	angular.module('app', ['ui.router', 'app.directive']);

	angular.module('app').config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: './partials/home.html',
				controller: 'HomeController',
				controllerAs: 'vm',
				resolve: {
					restaurants: function($http) {
						return $http.get('data/restaurant.json').then(function(response) {
							return response.data;
						}, function() {
							return '服务器出错了, 请联系管理员';
						});
					}
				}
			})
			.state('myOrder', {
				url: '/myOrder',
				templateUrl: './partials/myOrder.html',
				controller: 'MyOrderController',
				controllerAs: 'vm'
			})
			.state('myOrderList', {
				url: '/myOrderList/:phoneNumber',
				views: {
					'': {
						templateUrl: './partials/myOrderList.html'
					},
					'list@myOrderList': {
						templateUrl: './partials/list.html',
						controller: 'MyOrderListController',
						controllerAs: 'vm',
						resolve: {
							order: function($http, $stateParams, $filter) {
								return $http.get('data/order.json').then(function(response) {
									return $filter('filter')(response.data, {'phoneNumber': $stateParams.phoneNumber});
								}, function() {
									return '出错了';
								});
							}
						}
					},
					'leftnav@myOrderList': {
						templateUrl: './partials/leftnav.html'
					},
					'personal@myOrderList': {
						templateUrl: './partials/personal.html'
					}
				}
			})
			.state('restaurants', {
				url: '/restaurants/:id',
				templateUrl: './partials/myRestaurant.html',
				controller: 'MyRestaurantController',
				controllerAs: 'vm',
				resolve: {
					restaurant: function($http, $stateParams) {
						return $http.get('data/restaurant.json').then(function(response) {
							return _.find(response.data, {'id': Number($stateParams.id)});
						}, function() {
							return '出错了';
						});
					}
				}
			})
			.state('restaurants.menu', {
				url: '/menu',
				templateUrl: './partials/myMenu.html',
				controller: 'MyMenuController',
				controllerAs: 'vm'
			})
			.state('restaurants.evaluate', {
				url: '/evaluate',
				templateUrl: './partials/myEvaluate.html',
				controller: 'MyEvaluateController',
				controllerAs: 'vm'
			})
			.state('restaurants.comment', {
				url: '/comment',
				templateUrl: './partials/myComments.html',
				controller: 'MyCommentController',
				controllerAs: 'vm'
			});

		$urlRouterProvider.otherwise('/home');
	});

	angular.module('app').controller('MainController', function($scope) {

	});

	angular.module('app').controller('HomeController', function($scope, restaurants) {

		var vm = this;

		vm.restaurants = restaurants;

		vm.tastes = [
			{name: '全部口味', value: undefined},
			{name: '中餐', value: '中餐'},
			{name: '西餐', value: '西餐'},
			{name: '日韩', value: '日韩'}
		];

		vm.sorts = [
			{name: '综合排序', value: undefined},
			{name: '销量排序', value: 'salesVolume'},
			{name: '评价排序', value: 'rank'},
			{name: '起送价', value: 'startPrice'}
		];

	});

	angular.module('app').controller('MyOrderController', function($state) {
		var vm = this;
		vm.query = function() {
			$state.go('myOrderList', {phoneNumber: vm.phoneNumber});
		};
	});

	angular.module('app').controller('MyRestaurantController', function($state, restaurant) {
		var vm = this;
		vm.restaurant = restaurant;
		$state.go('restaurants.menu');
	});

	angular.module('app').controller('MyMenuController', function($stateParams) {
		// 嵌套视图, 默认继承传递的参数
		console.log($stateParams);
	});

	angular.module('app').controller('MyEvaluateController', function($stateParams) {
		console.log($stateParams);
	});

	angular.module('app').controller('MyCommentController', function($stateParams) {
		console.log($stateParams);
	});

	angular.module('app').controller('MyOrderListController', function(order) {

		var vm = this;

		vm.options = {
			currentPage: 1,
			totalItems: order.length,
			pageSize: 20
		};

		vm.reloadData = function(pageSetting) {
			// console.log('reload data');
			vm.orders = _.slice(order, (pageSetting.currentPage - 1) * pageSetting.pageSize, pageSetting.currentPage * pageSetting.pageSize);
		};
	});

})();
