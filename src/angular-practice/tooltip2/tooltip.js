/**
 * @desc 简单tooltip
 * @author [hjzheng]
 * @date  2017-1-18
 */
(function() {
	angular
		.module('ui-tooltip', [])
		.directive('tooltip', tooltip);
	tooltip.$inject = ['$document', '$templateRequest', '$compile', '$timeout'];
	function tooltip($document, $templateRequest, $compile, $timeout) {

		var body = angular.element($document[0].body);

		// 获取模板
		var getTpl = function() {
			return $templateRequest('./tooltip.tpl.html');
		};

		// 计算位置
		var getPosition = function(element, tooltipEle, placement) {

			var eleRect = element.getBoundingClientRect();
			var tooltipEleRect = tooltipEle[0].getBoundingClientRect();
			var htmlRect = $document[0].documentElement.getBoundingClientRect();

			function computeArrowLeftValue(location) {
				if (location === 'left') {
					return (eleRect.width / 2) / (tooltipEleRect.width) * 100 + '%';
				} else if (location === 'right') {
					return (100 - (eleRect.width / 2) / (tooltipEleRect.width) * 100) + '%';
				}
			}

			function setArrow(orientation, location) {
				// 设置三角方向
				tooltipEle[0].classList.add(orientation);
				// 重新计算三角位置
				tooltipEle[0].querySelector('.tooltip-arrow').style.left = computeArrowLeftValue(location);
			}

			// 空隙
			var space = 6;

			var left = 0;
			var top = 0;

			// 四个方向, 可能的最大值
			var tL = eleRect.left - tooltipEleRect.width - space;
			var tT = eleRect.top - tooltipEleRect.height - space;
			var tR = eleRect.left + eleRect.width + tooltipEleRect.width + space;
			var tB = eleRect.top + eleRect.height + tooltipEleRect.height + space;

			if (placement === 'left') {
				left = eleRect.left - tooltipEleRect.width - space + 'px';
				top = eleRect.top + eleRect.height / 2 - tooltipEleRect.height / 2 + 'px';
			} else if (placement === 'right') {
				left = eleRect.left + eleRect.width + space + 'px';
				top = eleRect.top + eleRect.height / 2 - tooltipEleRect.height / 2 + 'px';
			} else if (placement === 'top') {
				left = eleRect.left + eleRect.width / 2 - tooltipEleRect.width / 2 + 'px';
				top = eleRect.top - tooltipEleRect.height - space + 'px';
			} else if (placement === 'bottom') {
				left = eleRect.left + eleRect.width / 2 - tooltipEleRect.width / 2 + 'px';
				top = eleRect.height + eleRect.top + space + 'px';
			} else {
				// 用户未配置 placement
				var isLeft = false, isTop = false, isRight = false, isBottom = false; // eslint-disable-line

				if (tL > 0) {
					isLeft = true;
				}
				if (tT > 0) {
					isTop = true;
				}
				if (tR < htmlRect.width) {
					isRight = true;
				}
				if (tB < htmlRect.height) {
					isBottom = true;
				}

				if (isLeft === false) {
					if (isTop === false) {
						left = 0;
						top = eleRect.height + eleRect.top + space + 'px';
						setArrow('bottom', 'left');
					} else if (isBottom === false) {
						left = 0;
						top = eleRect.top - tooltipEleRect.height - space + 'px';
						setArrow('top', 'left');
					}
				} else if (isRight === false) {
					if (isTop === false) {
						left = htmlRect.width - tooltipEleRect.width + 'px';
						top = eleRect.height + eleRect.top + space + 'px';
						setArrow('bottom', 'right');
					} else if (isBottom === false) {
						left = htmlRect.width - tooltipEleRect.width + 'px';
						top = eleRect.top - tooltipEleRect.height - space + 'px';
						setArrow('top', 'right');
					}
				} else {
					left = eleRect.left + eleRect.width + space + 'px';
					top = eleRect.top + eleRect.height / 2 - tooltipEleRect.height / 2 + 'px';
					tooltipEle[0].classList.add('right');
				}
			}

			return {
				left: left,
				top: top
			};
		};

		return {
			restrict: 'A',
			link: function($scope, iElement, iAttrs) {
				var tooltipEle = null;

				// 创建 scope
				var scope = $scope.$new();

				scope.content = iAttrs.tooltip;
				scope.placement = iAttrs.placement;
				scope.type = iAttrs.type || 'default';

				getTpl().then(function(tpl) {
					tooltipEle = $compile(tpl)(scope);
				});

				iElement.bind('mouseenter', openTooltip);

				function closeTooltip(event) {
					if (!iElement[0].contains(event.target)) {
						tooltipEle && tooltipEle.remove();
						$document.unbind('mouseover', closeTooltip);
						// 销毁 scope
						if (scope && typeof scope.$destroy === 'function') {
							scope.$destroy();
						}
					}
				}

				function openTooltip() {

					$document.bind('mouseover', closeTooltip);

					body.append(tooltipEle);

					$timeout(function() {
						tooltipEle.css(getPosition(iElement[0], tooltipEle, iAttrs.placement));
					}, 0);
				}
			}
		};
	}
})();
