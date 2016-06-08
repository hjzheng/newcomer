/**
 * Created by hjzheng on 16/6/8.
 */
(function() {
	angular.module('app', []);

	angular.module('app').controller('MainCtrl', function() {
	});
	angular.module('app').directive('myDate', function() {
		var dateUtil = {
			dateArr: null,
			// 取得当前的日期对象
			getDate: function() {
				return new Date(this.dateArr.join('-'));
			},
			// 取得开始日期对象
			getStartDate: function() {
				var tempDateArr = this.dateArr;
				tempDateArr.pop();
				tempDateArr.push(1);
				return new Date(tempDateArr.join('-'));
			},
			// 取得当月中的天数
			getDaysInMonth: function(year, month) {
				var days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				if (month === 1) {
					return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28;
				} else {
					return days_in_months[month];
				}
			},
			// 填补本月第一周不在当月的天
			initFirstWeekArr: function(startDay) {
				var firstWeek = [];
				for (var i = 0; i < startDay; i++) {
					firstWeek.push(null);
				}
				return firstWeek;
			},
			// 填补本月最后一周不在当月的天
			updateLastWeekArr: function(daysMatrix) {
				var endDay = 7 - daysMatrix[daysMatrix.length - 1].length;
				for (var i = 0; i < endDay; i++) {
					daysMatrix[daysMatrix.length - 1].push(null);
				}
				return daysMatrix;
			},
			// 取得日期矩阵
			getDaysMatrix: function() {
				var startDay = this.getStartDate().getDay();
				var days = this.getDaysInMonth(this.dateArr[0], this.dateArr[1] - 1);
				var daysMatrix = [];
				var j = 0;
				daysMatrix[j] = this.initFirstWeekArr(startDay);

				for (var i = 1; i <= days; i++) {
					daysMatrix[j].push(i);
					if (daysMatrix[j].length === 7) {
						j++;
						if (i !== days) daysMatrix[j] = [];
					}
				}

				return this.updateLastWeekArr(daysMatrix);
			},
			init: function(date) {
				this.dateArr = date.split('-');
			}
		};

		// 根据用户填写的数据自动生成年份 上下各推5年
		function getYears(year) {
			var years = [];
			var start = year - 5;
			var end = year + 5;
			for (var i = start; i < end; i++) {
				years.push({name: i + '年', value: i});
			}

			return years;
		}

		return {
			restrict: 'E',
			templateUrl: './date.tpl.html',
			scope: {
				date: '@'
			},
			controller: function($scope) {
				var that = this;

				dateUtil.init(this.date);

				// that.daysMatrix = dateUtil.getDaysMatrix();

				that.months = [
					{name: '一月', value: 0},
					{name: '二月', value: 1},
					{name: '三月', value: 2},
					{name: '四月', value: 3},
					{name: '五月', value: 4},
					{name: '六月', value: 5},
					{name: '七月', value: 6},
					{name: '八月', value: 7},
					{name: '九月', value: 8},
					{name: '十月', value: 9},
					{name: '十一月', value: 10},
					{name: '十二月', value: 11}
				];

				that.years = getYears(Number(dateUtil.dateArr[0]));

				that.selectDay = function(day) {
					$scope.day = day;
					// console.log($scope.year, $scope.month, $scope.day);
				};

				$scope.month = dateUtil.getDate().getMonth();
				$scope.year = dateUtil.getDate().getFullYear();

				$scope.prev = function() {
					$scope.month = $scope.month - 1 === -1 ? 11 : $scope.month - 1;
				};

				$scope.next = function() {
					$scope.month = $scope.month + 1 === 12 ? 0 : $scope.month + 1;
				};

				$scope.$watchGroup(['year', 'month'], function(newValue) {
					if (newValue) {
						dateUtil.dateArr[0] = newValue[0];
						dateUtil.dateArr[1] = newValue[1] + 1;
					}

					that.daysMatrix = dateUtil.getDaysMatrix();

				});
			},
			bindToController: true,
			controllerAs: 'vm'
		};
	});
})();

