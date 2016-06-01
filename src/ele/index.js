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
				controller: 'myOrderCtrl'
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

	angular.module('app').controller('myOrderCtrl', function ($scope, $http) {

	});

	// angular.module('app').filter('search', function() {
	// 	return function(array, params) {
	//
	// 	};
	// });

})();