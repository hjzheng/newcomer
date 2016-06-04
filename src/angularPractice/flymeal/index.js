/**
 * Created by hjzheng on 16/5/31.
 */
(function () {
	angular.module('app', ['ui.router', 'app.directive']);

	angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: './partials/home.html',
				controller: 'HomeCtrl'
			})
			.state('myOrder', {
				url: '/myOrder',
				templateUrl: './partials/myOrder.html',
				controller: 'MyOrderCtrl'
			})
			.state('myOrderList', {
				url: '/myOrderList/:phoneNumber',
				templateUrl: './partials/myOrderList.html',
				controller: 'MyOrderListCtrl',
				resolve: {
					order: function($http, $stateParams, $filter) {
						return $http.get('data/order.json').then(function(response){
							return $filter('filter')(response.data, {'phoneNumber': $stateParams.phoneNumber});
						}, function () {
							return '出错了';
						});
					}
				}
			})
			.state('restaurants', {
				url: '/restaurants/:id',
				templateUrl: './partials/myRestaurant.html',
				controller: 'MyRestaurantCtrl',
				resolve: {
					restaurant: function($http, $stateParams) {
						return $http.get('data/restaurant.json').then(function(response){
							return _.find(response.data, {'id': new Number($stateParams.id)});
						}, function () {
							return '出错了';
						});
					}
				}
			})
			.state('restaurants.menu', {
				url: '/menu',
				templateUrl: './partials/myMenu.html',
				controller: 'MyMenuCtrl'
			})
			.state('restaurants.evaluate', {
				url: '/evaluate',
				templateUrl: './partials/myEvaluate.html',
				controller: 'MyEvaluateCtrl'
			})
			.state('restaurants.comment', {
				url: '/comment',
				templateUrl: './partials/myComments.html',
				controller: 'MyCommentCtrl'
			});

		$urlRouterProvider.otherwise('/home');
	});
	
	angular.module('app').controller('MainCtrl', function ($scope) {

	});

	angular.module('app').controller('HomeCtrl', function ($scope, $http) {

		$http.get('data/restaurant.json').then(function(response){
			$scope.restaurants = response.data;
		}, function () {
			$scope.showMessage = "服务器出错了, 请联系管理员";
		});

		$scope.tastes = [
			{name: '全部口味', value : undefined},
			{name: '中餐', value:'中餐'},
			{name: '西餐', value:'西餐'},
			{name: '日韩', value: '日韩'}
		];

		$scope.sorts = [
			{name: '综合排序', value : undefined},
			{name: '销量排序', value: 'salesVolume'},
			{name: '评价排序', value:'rank'},
			{name: '起送价', value: 'startPrice'}
		];

	});

	angular.module('app').controller('MyOrderCtrl', function($scope, $state) {
		$scope.query = function(){
			$state.go('myOrderList', {phoneNumber: $scope.phoneNumber});
		}
	});

	angular.module('app').controller('MyRestaurantCtrl', function($scope, $state, restaurant){
		$scope.restaurant = restaurant;
		$state.go('restaurants.menu');
	});

	angular.module('app').controller('MyMenuCtrl', function($scope, $stateParams){
		//嵌套视图, 默认继承传递的参数
		console.log($stateParams.id);
	});

	angular.module('app').controller('MyEvaluateCtrl', function($scope, $stateParams){
		console.log($stateParams.id);
	});

	angular.module('app').controller('MyCommentCtrl', function($scope, $stateParams){
		console.log($stateParams.id);
	});

	angular.module('app').controller('MyOrderListCtrl', function($scope, order){

		$scope.options = {
			currentPage: 1,
			totalItems: order.length,
			pageSize: 20
		};

		$scope.reloadData = function(pageSetting){
			console.log('reload data');
			$scope.orders = _.slice(order, (pageSetting.currentPage - 1) * pageSetting.pageSize, pageSetting.currentPage * pageSetting.pageSize);
		}
	});

})();