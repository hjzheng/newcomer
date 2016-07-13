/**
 * Created by hjzheng on 16/6/16.
 */
(function() {
	angular.module('app', []);

	angular.module('app').controller('MainController', function($scope) {
		$scope.imageList = [{
			label: 'im1',
			url: './img/t.jpeg'
		}, {
			label: 'im2',
			url: './img/t.jpeg'
		}, {
			label: 'im3',
			url: './img/t.jpeg'
		}, {
			label: 'im4',
			url: './img/t.jpeg'
		}, {
			label: 'im5',
			url: './img/t.jpeg'
		}, {
			label: 'im6',
			url: './img/t.jpeg'
		}, {
			label: 'im7',
			url: './img/t.jpeg'
		}];
	});

	angular.module('app').directive('mySlide', function() {
		return {
			restrict: 'E',
			scope: {
				totalWidth: '@',
				imageList: '=',
				imageWidth: '@',
				imageHeight: '@',
				imageMargin: '@'
			},
			templateUrl: './slide.html',
			controllerAs: 'vm',
			controller: function($scope, $element) {
				var vm = this;

				vm.totalWidth = vm.totalWidth || '400px';
				vm.imageWidth = vm.imageWidth || '90px';
				vm.imageHeight = vm.imageHeight || '90px';
				vm.imageMargin = vm.imageMargin || '14px';

				var offsetW = parseInt(vm.imageWidth, 10) + parseInt(vm.imageMargin, 10);
				var imagesTotalWidth = offsetW * vm.imageList.length - parseInt(vm.imageMargin, 10);
				vm.isShowRight = parseInt(vm.totalWidth, 10) < imagesTotalWidth;
				vm.isShowLeft = false;

				vm.toLeft = function() {
					$element.find('ul').css('left', parseInt($element.find('ul').css('left'), 10) + offsetW + 'px');
					checkBtn();
				};
				vm.toRight = function() {
					$element.find('ul').css('left', parseInt($element.find('ul').css('left'), 10) - offsetW + 'px');
					checkBtn();
				};

				function checkBtn() {
					if (parseInt($element.find('ul').css('left'), 10) + imagesTotalWidth <= parseInt(vm.totalWidth, 10)) {
						vm.isShowRight = false;
					} else {
						vm.isShowRight = true;
					}

					if (parseInt($element.find('ul').css('left'), 10) >= 0) {
						vm.isShowLeft = false;
					} else {
						vm.isShowLeft = true;
					}
				}
			},
			bindToController: true
		};
	});
}());
