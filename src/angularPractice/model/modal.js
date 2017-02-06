/**
 * Created by hjzheng
 */
(function() {
	angular.module('ui-modal', []);

	angular.module('ui-modal').factory('myModalService', function($document, $q, $templateRequest, $rootScope, $controller, $compile) {

		/**
		 * templateUrl or template
		 * controller 默认是 function(){}
		 * controllerAs 默认是 'vm'
		 * locals 本地参数
		 * headerTitle
		 * */

		return function(config) {

			if (!(config.template || config.templateUrl)) {
				throw new Error('Expected modal to have exactly one of either `template` or `templateUrl`');
			}

			var controller = config.controller || function() {};
			var controllerAs = config.controllerAs || 'vm';
			var locals = config.locals || {};
			var headerTitle = config.headerTitle || '我是一个标题';

			var root = angular.element($document[0].querySelector('html'));
			// backdrop
			var backdrop = angular.element('<div class="modal-backdrop"></div>');
			var modalHtml = $templateRequest('./modal.tpl.html');
			var element = null;
			var modalBodyHtml, scope;

			if (config.template) {
				modalBodyHtml = $q.when(config.template);
			} else {
				modalBodyHtml = $templateRequest(config.templateUrl);
			}

			function appendModal(modalEle) {
				root.append(modalEle);
				root.append(backdrop);
				modalEle.addClass('in');
			}

			function removeModal(modalEle) {
				modalEle.removeClass('in');
				modalEle.remove();
				backdrop.remove();
			}

			function open() {
				var deferred = $q.defer();
				$q.all([modalHtml, modalBodyHtml]).then(function(htmls) {
					if (!element) {
						element = angular.element(htmls[0]);
						element[0].querySelector('.modal-body').appendChild(angular.element(htmls[1])[0]);
						appendModal(compileModel(element, deferred));
					}
				});

				return deferred.promise;
			}

			function compileModel(element, deferred) {

				var modalEle = null;

				scope = $rootScope.$new();

				// 设置标题
				scope.title = headerTitle;

				// 设置三个方法 close, ok, cancel, 通过 Promise, 如果用户定义三个方法, 获取方法返回值
				scope.close = function() {
					removeModal(modalEle);
					if (scope[controllerAs].close) {
						deferred.reject(scope[controllerAs].close());
					} else {
						deferred.reject();
					}
				};

				scope.ok = function() {
					removeModal(modalEle);
					if (scope[controllerAs].ok) {
						deferred.resolve(scope[controllerAs].ok());
					} else {
						deferred.resolve();
					}
				};

				scope.cancel = function() {
					removeModal(modalEle);
					if (scope[controllerAs].cancel) {
						deferred.reject(scope[controllerAs].cancel());
					} else {
						deferred.reject();
					}
				};

				for (var prop in locals) {
					scope[prop] = locals[prop];
				}

				var ctrl = $controller(controller, {
					$scope: scope
				});

				scope[controllerAs] = ctrl;

				modalEle = $compile(element)(scope);

				return modalEle;
			}

			return {
				open: open
			};
		};
	});
}());
